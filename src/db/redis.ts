import { createClient } from 'redis'

const redisURL = process.env.redis || 'redis://127.0.0.1:6380'

const redisCache = createClient({ url: redisURL })

redisCache.on('error', (err) => console.log('Redis Client Error', err))

export default redisCache
export { redisCache }
