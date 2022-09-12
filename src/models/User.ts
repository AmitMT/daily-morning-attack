import mongoose, { Schema, model, Document } from 'mongoose';

export interface UserType extends Document {
	_id?: number;
	name: string;
	email: string;
	hashedPassword: string;
	image?: string;
	admin?: boolean;
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
	admin: {
		type: Boolean,
		default: false,
	},
});

export default (mongoose.models.User as mongoose.Model<UserType>) ||
	model('User', userSchema, 'users');
