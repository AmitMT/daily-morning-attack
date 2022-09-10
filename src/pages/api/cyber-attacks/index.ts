import { MongooseError } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { ZodError } from 'zod';

import { connect } from '../../../lib/mongodb/connection';
import CyberAttack from '../../../models/CyberAttack';
import User from '../../../models/User';
import { CyberAttackSchema, CyberAttackSchemaType } from '../../../utils/zodSchemas';
import { authOptions } from '../auth/[...nextauth]';

interface ResponseData {
	error?: string;
	id?: string;
	cyberAttacks?: any[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method === 'GET') {
		const { amount, allData } = req.query;

		await connect();

		try {
			if (amount && !Array.isArray(amount))
				return res.json({
					cyberAttacks: await CyberAttack.find()
						.sort({ date: -1 })
						.populate('author')
						.limit(parseInt(amount, 10))
						.select(allData === 'true' ? '' : '-markdownContent')
						.exec(),
				});
			return res.json({
				cyberAttacks: await CyberAttack.find().sort({ date: -1 }).exec(),
			});
		} catch (e) {
			res.status(500).json({ error: (e as Error).message });
		}
	} else if (req.method === 'POST') {
		const session = await unstable_getServerSession(req, res, authOptions);
		if (!session || !session?.user?.name) res.status(401);

		const { title, markdownContent } = req.body;

		try {
			CyberAttackSchema.parse({ title, markdownContent });
		} catch (err) {
			if (!(err instanceof ZodError)) res.status(500).send(err as any);

			const error = (err as ZodError<CyberAttackSchemaType>).issues.reduce(
				(acc, value) => `${acc}, ${value.message}`,
				'',
			);
			return res.status(400).json({ error: error ? error.slice(2) : error });
		}

		await connect();

		let authorId;
		try {
			authorId = (await User.findOne({ name: session?.user?.name }).exec())?.id;
		} catch (e) {
			return res.status(401).json({ error: 'Your name was not found in the DB' });
		}

		// create new User on MongoDB
		const newCyberAttack = new CyberAttack({
			title,
			markdownContent,
			author: authorId,
			date: Date.now(),
		});

		newCyberAttack
			.save()
			.then(({ _id }) => {
				return res.status(200).json({ id: _id.toString() });
			})
			.catch((error: MongooseError) => {
				if (error.message.startsWith('E11000'))
					return res.status(400).json({ error: 'User already exists' });
				return res.status(400).json({ error: error.message });
			});
		return;
	}

	return res
		.status(404)
		.json({ error: `This API route doesn't accept the "${req.method}" method` });
}
