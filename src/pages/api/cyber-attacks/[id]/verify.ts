import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';

import { connect } from '../../../../lib/mongodb/connection';
import CyberAttack from '../../../../models/CyberAttack';
import User from '../../../../models/User';
import { authOptions } from '../../auth/[...nextauth]';

interface ResponseData {
	error?: string;
	cyberAttack?: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method === 'POST') {
		const session = await unstable_getServerSession(req, res, authOptions);
		if (!session || !session?.user?.email) res.status(401);

		const { id } = req.query;

		try {
			await connect();

			const admin = await User.findOne({ email: session?.user?.email, admin: true });

			const cyberAttack = await CyberAttack.findById(id).populate('author').exec();
			if (!admin) return res.status(401).json({ error: 'Only an admin can verify it' });

			await cyberAttack?.update({ verified: true }).exec();
		} catch (err) {
			res.status(500).json({ error: (err as Error).message });
		}
		return res.status(200).end();
	}

	return res
		.status(404)
		.json({ error: `This API route doesn't accept the "${req.method}" method` });
}
