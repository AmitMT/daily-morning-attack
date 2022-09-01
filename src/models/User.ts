import mongoose, { Schema, model } from 'mongoose';

export interface UserType {
	_id?: number;
	name: string;
	email: string;
	hashedPassword: string;
	image?: string;
}

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
	model('User', userSchema, 'users');
