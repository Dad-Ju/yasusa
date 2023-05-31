/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import mongoose, { Schema, Types } from 'mongoose'
import type { BotType } from './types'

export type StatsType = {
	id: string
	bot: Types.ObjectId | BotType
} & mongoose.Document

export type StatsCreatePayload = {
	botId: Types.ObjectId
}

export interface StatsModel extends mongoose.Model<StatsType> {
	add(payload: StatsCreatePayload): Promise<StatsType>
}

export const StatsSchema = new Schema<StatsType, StatsModel>(
	{
		bot: { type: Schema.Types.ObjectId, ref: 'starts', require: false },
	},
	{
		timestamps: { createdAt: true, updatedAt: true },
		skipVersioning: {
			reports: true,
		},
		versionKey: false,
	}
)

StatsSchema.statics.add = async function ({ botId }: StatsCreatePayload) {
	if (!botId) throw new Error('no botID provided!')

	const Stat = new Stats({ bot: botId })

	try {
		await Stat.save()
	} catch (error) {
		throw new Error('something odd went wrong :pain:')
	}

	return Stat
}

export const Stats = mongoose.model<StatsType, StatsModel>('Stats', StatsSchema)
