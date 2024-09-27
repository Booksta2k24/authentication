import { Next, Req, Res } from "../types/expressTypes";
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

// Initialize Redis client
const redisClient = new Redis({
    host: 'localhost', 
    port: 6379,        
});

// Log a message when Redis is successfully connected
redisClient.on('connect', () => {
    console.log("Redis connected successfully.");
});

// Log an error message if there is an error connecting to Redis
redisClient.on('error', (err: Error) => {
    console.error("Redis connection error:", err);
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimit',
    points: 10, // Number of points (requests)
    duration: 1, // Per second
});

const coolDownLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'coolDown',
    points: 1,
    duration: 60, 
});

const rateLimiterMiddleware = async (req: Req, res: Res, next: Next) => {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;
    console.log("Request IP:", ip);
    
    try {
        await rateLimiter.consume(ip);
        console.log("Request allowed. Proceeding to the next middleware.");
        next();
    } catch (rateLimiterRes) {
        try {
            // Check if IP is in coolDown
            await coolDownLimiter.consume(ip);
            // If we reach here, the IP is not in coolDown, so we put it in cool Down 
            console.log("Rate limit exceeded for IP:", ip);
            console.log("IP put in 1-minute cool down");
            res.status(429).send('Too many requests. Please try again in 1 minute.');
        } catch (coolDownRes: any) {
            // IP is in cool down
            const timeLeft = Math.round(coolDownRes.msBeforeNext / 1000) || 1;
            console.log(`IP ${ip} is in cool down. ${timeLeft} seconds left.`);
            res.status(429).send(`Too many requests. Please try again in ${timeLeft} seconds.`);
        }
    }
};

export default rateLimiterMiddleware;