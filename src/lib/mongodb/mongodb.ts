// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb';

import globalCache from '../../types/global';

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error('Please add your Mongo URI to .env.local');

const createClientPromise = async (): Promise<MongoClient> => {
	if (process.env.NODE_ENV === 'development') {
		// In development mode, use a global variable so that the value
		// is preserved across module reloads caused by HMR (Hot Module Replacement).

		if (!globalCache.mongoClientPromise)
			globalCache.mongoClientPromise = new MongoClient(MONGODB_URI).connect();

		return globalCache.mongoClientPromise;
	}
	// In production mode, it's best to not use a global variable.
	return new MongoClient(MONGODB_URI).connect();
};

const clientPromise = createClientPromise();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
