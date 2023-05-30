import Fastify, { FastifyInstance } from 'fastify'

const server: FastifyInstance = Fastify({})

server.get('/', () => 'Welcome to the SUS API')

export default server
export { server }
