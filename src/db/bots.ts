/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import mongoose, { Schema, Types } from 'mongoose'
import type { ReportType } from './types'
import { StatsType } from './stats'

export enum BotLevelEnum {
	'community',
	'medium',
	'trusted',
}

export type BotType = {
	id: string
	name: string
	invite?: string
	website?: string
	moderators: string[]
	level: BotLevelEnum
	reports: [Types.ObjectId | ReportType]
	stats: Types.ObjectId | StatsType
} & mongoose.Document

export type BotCreatePayload = {
	name: string
	invite?: string
	website?: string
	moderators?: string[]
	level?: BotLevelEnum
}

export interface BotModel extends mongoose.Model<BotType> {
	add(payload: BotCreatePayload): Promise<BotType>
}

export const BotSchema = new Schema<BotType, BotModel>(
	{
		name: { type: String, required: true, index: true },
		invite: { type: String },
		website: { type: String },
		reports: [
			{ type: Schema.Types.ObjectId, ref: 'reports', required: true },
		],
		moderators: [{ type: String }],
		level: {
			type: Number,
			enum: BotLevelEnum,
			default: BotLevelEnum.community,
			required: true,
		},
		stats: { type: Schema.Types.ObjectId, ref: 'starts', require: false },
	},
	{
		timestamps: { createdAt: true, updatedAt: true },
		skipVersioning: {
			reports: true,
		},
		versionKey: false,
	}
)

BotSchema.statics.add = async function ({
	name,
	invite,
	level,
	moderators,
	website,
}: BotCreatePayload) {
	if (!name) throw new Error('no Name provided!')

	const Bot = new Bots({
		name,
		invite,
		level: level || BotLevelEnum.community,
		moderators,
		website,
	})

	try {
		await Bot.save()
	} catch (error) {
		throw new Error('something odd went wrong :pain:')
	}

	return Bot
}

export const Bots = mongoose.model<BotType, BotModel>('Bots', BotSchema)
