import { MongoClient } from 'mongodb';
import { Mongoose } from 'mongoose';

const globalCache = global as typeof globalThis & {
	mongoClientPromise?: Promise<MongoClient>;
	mongoose?: { connection: Mongoose | null; promise: Promise<Mongoose> | null };
};

export default globalCache;
