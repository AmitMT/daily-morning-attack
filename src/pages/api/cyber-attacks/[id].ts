import type { NextApiRequest, NextApiResponse } from 'next';

import { connect } from '../../../lib/mongodb/connection';
import CyberAttack from '../../../models/CyberAttack';

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
	}

	return res
		.status(404)
		.json({ error: `This API route doesn't accept the "${req.method}" method` });
}
