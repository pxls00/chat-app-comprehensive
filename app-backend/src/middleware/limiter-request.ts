import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import redisClient from '../redis'

const limiter = rateLimit({
	windowMs: 60 * 1000, 
	max: 10,
	standardHeaders: true, 
	legacyHeaders: false, 

	store: new RedisStore({
		sendCommand: (...args: string[]) => redisClient.sendCommand(args),
	}),
  handler: (request, response, next) => {
		return response.status(429).json({
			error: 'Too many requests',
			message: 'You have exceeded the rate limit. Please try again after 60 seconds.',
			limit: 10,
			reset: Math.floor(Date.now() / 1000) + 60 
		})
	},
})

export default limiter