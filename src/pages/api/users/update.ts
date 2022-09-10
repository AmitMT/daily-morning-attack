// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { ZodError } from 'zod';

import { connect } from '../../../lib/mongodb/connection';
import User from '../../../models/User';
import { ProfileSettingsSchema, ProfileSettingsSchemaType } from '../../../utils/zodSchemas';
import { authOptions } from '../auth/[...nextauth]';

interface ResponseData {
	error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method !== 'POST')
		return res.status(404).json({ error: 'This API call only accepts POST methods' });

	const session = await unstable_getServerSession(req, res, authOptions);
	if (!session || !session?.user?.name) res.status(401);

	const { username, email } = req.body;

	try {
		ProfileSettingsSchema.parse({ username, email });
	} catch (err) {
		if (!(err instanceof ZodError)) res.status(500).send(err as any);

		const error = (err as ZodError<ProfileSettingsSchemaType>).issues.reduce(
			(acc, value) => `${acc}, ${value.message}`,
			'',
		);
		return res.status(400).json({ error: error ? error.slice(2) : error });
	}

	try {
		await connect();

		await User.syncIndexes();

		await User.findOneAndUpdate({ email: session?.user?.email }, { name: username, email }).exec();
	} catch (err) {
		res.status(500).json({ error: (err as Error).message });
	}

	return res.status(200).end();
}
