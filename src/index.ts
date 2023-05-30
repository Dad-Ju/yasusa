import 'dotenv/config'
import { server } from './server'
import { connectDB } from './db'
// Check DB Con befor starting the Webserver!

const start = async () => {
	await connectDB()

	try {
		server.listen({
			port: Number(process.env.port) || 3000,
		})

		const address = server.server.address()
		const port = typeof address === 'string' ? address : address?.port

		console.log('Listening on Port:', port)
	} catch (err) {
		server.log.error(err)
		process.exit(1)
	}
}
start()
