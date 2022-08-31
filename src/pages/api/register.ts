// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcrypt from 'bcrypt';
import { MongooseError } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

import { connect } from '../../lib/mongodb/connection';
import User from '../../models/User';
import { RegisterSchema, RegisterSchemaType } from '../../utils/zodSchemas';

interface ResponseData {
	error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method !== 'POST')
		return res.status(404).json({ error: 'This API call only accepts POST methods' });

	// Validation
	const { username, email, password } = req.body;

	try {
		RegisterSchema.parse({ username, email, password });
	} catch (err) {
		if (!(err instanceof ZodError)) res.status(500).send(err as any);

		const error = (err as ZodError<RegisterSchemaType>).issues.reduce(
			(acc, value) => `${acc}, ${value.message}`,
			'',
		);
		return res.status(400).json({ error: error ? error.slice(2) : error });
	}

	// hash password
	const hashedPassword = await bcrypt
		.hash(password, 12)
		.catch((error: string) => res.status(400).json({ error }));

	await User.syncIndexes();

	// create new User on MongoDB
	const newUser = new User({
		name: username,
		email,
		hashedPassword,
	});

	await connect();

	await newUser.save().catch((error: MongooseError) => {
		if (error.message.startsWith('E11000'))
			return res.status(400).json({ error: 'User already exists' });
		return res.status(400).json({ error: error.message });
	});

	return res.status(200).end();
}
