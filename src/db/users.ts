/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import mongoose, { Schema, Types } from 'mongoose'
import type { ReportType } from './types'

export type UserType = {
	id: string
	discordId: string
	alts: [string]
	reputation: number
	reports: [Types.ObjectId | ReportType]
} & mongoose.Document

export type UserCreatePayload = {
	dcId: string
}

export interface UserModel extends mongoose.Model<UserType> {
	add(payload: UserCreatePayload): Promise<UserType>
}

export const UserSchema = new Schema<UserType, UserModel>(
	{
		discordId: { type: String, index: true, required: true },
		alts: [{ type: String }],
		reputation: { type: Number, default: 100 },
		reports: [{ type: Schema.Types.ObjectId, ref: 'reports' }],
	},
	{
		timestamps: { createdAt: true, updatedAt: true },
		skipVersioning: {
			reports: true,
		},
		versionKey: false,
	}
)

UserSchema.statics.add = async function ({ dcId }: UserCreatePayload) {
	if (!dcId) throw new Error('no Discord ID Provided!')

	const user = new Users({ discordId: dcId })

	try {
		await user.save()
	} catch (error) {
		throw new Error('dcid already exists')
	}

	return user
}

export const Users = mongoose.model<UserType, UserModel>('users', UserSchema)
