/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import mongoose, { Schema, Types } from 'mongoose'
import type { BotType, UserType } from './types'

export enum ReportTypeEnum {
	'chargeback',
}

export type ReportType = {
	id: string
	target: Types.ObjectId | UserType
	bot: Types.ObjectId | BotType
	moderator: string
	reason: string
	type: ReportTypeEnum
	date: number
} & mongoose.Document

export type ReportCreatePayload = {
	target: Types.ObjectId
	bot: Types.ObjectId
	moderator: string
	reason?: string
	type?: ReportTypeEnum
	date: number
}

export interface ReportModel extends mongoose.Model<ReportType> {
	add(payload: ReportCreatePayload): Promise<ReportType>
}

export const ReportSchema = new Schema<ReportType, ReportModel>(
	{
		target: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],
		bot: [{ type: Schema.Types.ObjectId, ref: 'bots', required: true }],
		moderator: { type: String, required: true },
		reason: { type: String, default: '' },
		date: { type: Number, required: true },
		type: {
			type: Number,
			enum: ReportTypeEnum,
			default: ReportTypeEnum.chargeback,
			required: true,
		},
	},
	{
		timestamps: { createdAt: true, updatedAt: true },
		skipVersioning: {
			target: true,
			bot: true,
		},
		versionKey: false,
	}
)

ReportSchema.statics.add = async function ({
	bot,
	date,
	moderator,
	reason,
	target,
	type,
}: ReportCreatePayload) {
	if (!target) throw new Error('no target provided!')

	const report = new Reports({
		target,
		bot,
		moderator,
		date,
		reason: reason,
		type,
	})

	try {
		await report.save()
	} catch (error) {
		throw new Error('something odd went wrong :pain:')
	}

	return report
}

export const Reports = mongoose.model<ReportType, ReportModel>(
	'reports',
	ReportSchema
)
