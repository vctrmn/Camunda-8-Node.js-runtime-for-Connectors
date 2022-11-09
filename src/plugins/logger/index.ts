import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

/**
 * Load environments variables
 */
dotenv.config();

const {
    combine, colorize, splat, timestamp, printf,
} = format;
const { LOG_LEVEL = 'debug' } = process.env;

const customFormat = combine(
    colorize(),
    splat(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    printf((log) => `${log.timestamp} [${log.level}] : ${log.message}`),
);

export default createLogger({
    level: LOG_LEVEL,
    format: customFormat,
    transports: [new transports.Console()],
});
