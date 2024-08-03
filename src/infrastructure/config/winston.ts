import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

// Define the custom format for console output
const consoleFormat = format.printf(({ level, message, timestamp, service, ...metadata }) => {
    let msg = `${timestamp} [${service}] ${level}: ${message}`;
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});

// Create the logger
const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info', // Set the default log level
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamps
        format.errors({ stack: true }), // Include error stack traces
        format.splat(), // Enable string interpolation
        format.json() // Log in JSON format
    ),
    defaultMeta: { service: 'auth-service' }, // Default metadata for logs
    transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            )
        }),
        new transports.File({
            filename: 'combined.log',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            )
        }),
    ],
});

// Add console transport for non-production environments
if (process.env.NODE_ENV !== 'development') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(), // Add colorization
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            consoleFormat
        )
    }));
}

export default logger;
