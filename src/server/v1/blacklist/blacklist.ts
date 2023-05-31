import { RouteShorthandOptions } from 'fastify'
import server from 'server'

const opts: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					pong: {
						type: 'string',
					},
				},
			},
		},
	},
}

server.get('/v1/blacklist', opts, async (request, reply) => {
	console.log(request, reply)
	return { pong: 'we should not report the entire blacklist :?' }
})
