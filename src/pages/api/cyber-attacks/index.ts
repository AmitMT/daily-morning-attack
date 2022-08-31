import type { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../lib/mongodb/connection';
import CyberAttack from '../../../models/CyberAttack';

interface ResponseData {
	error?: string;
	cyberAttacks?: any[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method === 'GET') {
		const { amount } = req.query;

		await connect();

		try {
			if (amount && !Array.isArray(amount))
				return res.json({
					cyberAttacks: await CyberAttack.find()
						.sort({ date: -1 })
						.limit(parseInt(amount, 10))
						.exec(),
				});
			return res.json({
				cyberAttacks: await CyberAttack.find().sort({ date: -1 }).exec(),
			});
		} catch (e) {
			res.status(500).json({ error: (e as Error).message });
		}
	}

	return res
		.status(404)
		.json({ error: `This API route doesn't accept the "${req.method}" method` });
}
