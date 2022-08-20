import mongoose from 'mongoose';

import { UserType } from './types';

const { Schema } = mongoose;

const userSchema = new Schema<UserType>({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	hashedPassword: {
		type: String,
		required: true,
		minlength: 5,
	},
	image: {
		type: String,
	},
});

export default (mongoose.models.User as mongoose.Model<UserType>) ||
	mongoose.model('User', userSchema);
