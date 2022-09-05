// @ts-nocheck
import mongoose from 'mongoose';

import CyberAttack from '../../models/CyberAttack';
import User from '../../models/User';
import globalCache from '../../types/global';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error('Please add your MONGODB_URI to .env.local');

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

globalCache.mongoose = globalCache.mongoose || { connection: null, promise: null };

export const connect = async () => {
	if (!globalCache.mongoose) return null;

	if (globalCache.mongoose.connection) return globalCache.mongoose.connection;

	if (!globalCache.mongoose.promise) {
		globalCache.mongoose.promise = mongoose.connect(MONGODB_URI, {
			autoIndex: true,
		});

		// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention, unused-imports/no-unused-vars
		const _a = new User();
		// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention, unused-imports/no-unused-vars
		const _b = new CyberAttack();
		console.log('Mongoose Connection Established');
	}

	globalCache.mongoose.connection = await globalCache.mongoose.promise;
	return globalCache.mongoose.connection;
};
