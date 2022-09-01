import mongoose, { Schema, model, Types } from 'mongoose';

import { UserType } from './User';

export interface CyberAttackType {
	_id?: Types.ObjectId;
	title: string;
	author: UserType;
	markdownContent: string;
	date: Date;
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
});

export default (mongoose.models.CyberAttack as mongoose.Model<CyberAttackType>) ||
	model<CyberAttackType>('CyberAttack', cyberAttackSchema, 'Cyber Attacks');
