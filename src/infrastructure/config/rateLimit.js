"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const ioredis_1 = __importDefault(require("ioredis"));
// Initialize Redis client
const redisClient = new ioredis_1.default({
    host: 'localhost',
    port: 6379,
});
// Log a message when Redis is successfully connected
redisClient.on('connect', () => {
    console.log("Redis connected successfully.");
});
// Log an error message if there is an error connecting to Redis
redisClient.on('error', (err) => {
    console.error("Redis connection error:", err);
});
const rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimit',
    points: 10, // Number of points (requests)
    duration: 1, // Per second
});
const coolDownLimiter = new rate_limiter_flexible_1.RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'coolDown',
    points: 1,
    duration: 60,
});
const rateLimiterMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    console.log("Request IP:", ip);
    try {
        yield rateLimiter.consume(ip);
        console.log("Request allowed. Proceeding to the next middleware.");
        next();
    }
    catch (rateLimiterRes) {
        try {
            // Check if IP is in coolDown
            yield coolDownLimiter.consume(ip);
            // If we reach here, the IP is not in coolDown, so we put it in cool Down 
            console.log("Rate limit exceeded for IP:", ip);
            console.log("IP put in 1-minute cool down");
            res.status(429).send('Too many requests. Please try again in 1 minute.');
        }
        catch (coolDownRes) {
            // IP is in cool down
            const timeLeft = Math.round(coolDownRes.msBeforeNext / 1000) || 1;
            console.log(`IP ${ip} is in cool down. ${timeLeft} seconds left.`);
            res.status(429).send(`Too many requests. Please try again in ${timeLeft} seconds.`);
        }
    }
});
exports.default = rateLimiterMiddleware;
