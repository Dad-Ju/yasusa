import { connect } from 'mongoose'

const connectDB = async () => {
	const { dbcon } = process.env
	return connect(dbcon, { autoCreate: true, autoIndex: true }).catch(
		(error) => {
			console.error(error)
			process.exit(1)
		}
	)
}

export default {
	connectDB,
}

export { connectDB }
