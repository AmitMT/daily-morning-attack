import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

import { connect } from '../../../lib/mongodb/connection';
import clientPromise from '../../../lib/mongodb/mongodb';
import User from '../../../models/User';

const { GITHUB_ID, GITHUB_SECRET } = process.env;

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: GITHUB_ID as string,
			clientSecret: GITHUB_SECRET as string,
		}),
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				await connect();

				// Find user with the email
				const user = await User.findOne({ email: credentials?.email });

				// Email Not found
				if (!user) throw new Error('Email is not registered');

				// Check hashed password with DB hashed password
				const isPasswordCorrect = await compare(credentials!.password, user.hashedPassword);

				// Incorrect password
				if (!isPasswordCorrect) throw new Error('Password is incorrect');

				return user;
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	// debug: process.env.NODE_ENV === 'development',
	adapter: MongoDBAdapter(clientPromise),
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
});
