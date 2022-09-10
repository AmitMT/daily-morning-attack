import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { ZodError } from 'zod';

import { connect } from '../../../lib/mongodb/connection';
import CyberAttack from '../../../models/CyberAttack';
import { CyberAttackSchema, CyberAttackSchemaType } from '../../../utils/zodSchemas';
import { authOptions } from '../auth/[...nextauth]';

interface ResponseData {
	error?: string;
	cyberAttack?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method === 'GET') {
		const { id } = req.query;
		if (!id || Array.isArray(id))
			return res.status(400).json({ error: 'Please provide the id you want to fetch' });
		try {
			await connect();

			return res.json({
				cyberAttack: await CyberAttack.findById(id).populate('author').exec(),
			});
		} catch (e) {
			res.status(500).json({ error: (e as Error).message });
		}
	} else if (req.method === 'POST') {
		const session = await unstable_getServerSession(req, res, authOptions);
		if (!session || !session?.user?.name) res.status(401);

		const { id, title, markdownContent } = req.body;

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

		try {
			await connect();

			const cyberAttack = await CyberAttack.findById(id).populate('author').exec();
			if (cyberAttack?.author.email !== session?.user?.email)
				return res.status(401).json({ error: 'Only the creator of this post can edit it' });

			await cyberAttack?.update({ title, markdownContent }).exec();
		} catch (err) {
			res.status(500).json({ error: (err as Error).message });
		}
		return res.status(200).end();
	}

	return res
		.status(404)
		.json({ error: `This API route doesn't accept the "${req.method}" method` });
}
