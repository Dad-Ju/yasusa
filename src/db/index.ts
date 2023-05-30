import { connect } from 'mongoose'
import redisCache from './redis'

const connectDB = async () => {
	const { dbcon } = process.env

	await connect(dbcon, {
		autoCreate: true,
		autoIndex: true,
		appName: 'SUSI Bot',
	}).catch((error) => {
		console.error(error)
		process.exit(1)
	})

	// Initilizing redis aswell!
	await redisCache.connect().catch((error) => {
		console.error(error)
		process.exit(1)
	})
}

export default {
	connectDB,
}

export { connectDB }
