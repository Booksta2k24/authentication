import winston, { format, transports, Logger } from 'winston';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Custom format for console output
const consoleFormat = format.printf(({ level, message, timestamp, service, ...metadata }) => {
    let msg = `${timestamp} [${service}] ${level}: ${message}`;
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});

// Configure Winston logger
const logger: Logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'book-service' },
});

// Add file transports only in production environment
if (process.env.NODE_ENV === 'production') {
    logger.add(new transports.File({
        filename: 'error.log',
        level: 'error',
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        )
    }));

    logger.add(new transports.File({
        filename: 'combined.log',
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        )
    }));
}

// Add console transport for non-production environments
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            consoleFormat
        )
    }));
}

export default logger;
