import mongoose, { Schema, model, Types, Document, Model } from 'mongoose';

import { UserType } from './User';

export interface CyberAttackType extends Document {
	_id?: Types.ObjectId;
	title: string;
	author: UserType;
	markdownContent: string;
	date: Date;
	verified: boolean;
}

const cyberAttackSchema = new Schema<CyberAttackType>({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	markdownContent: {
		type: String,
		required: true,
	},
	date: {
		type: Schema.Types.Date,
		required: true,
	},
	verified: {
		type: Boolean,
		default: false,
	},
});

export default (mongoose.models.CyberAttack as Model<CyberAttackType>) ||
	model<CyberAttackType>('CyberAttack', cyberAttackSchema, 'Cyber Attacks');
