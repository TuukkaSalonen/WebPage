import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const env = process.env;
const errorLog = env.ERROR_LOG || "error";
const combinedLog = env.COMBINED_LOG || "combined";

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
);

// Winston logger
const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: [
        new winston.transports.Console(),

        new DailyRotateFile({
            filename: path.join(__dirname, "logs", errorLog + "-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxSize: "10m",
            maxFiles: "7d",
            zippedArchive: true,
        }),

        new DailyRotateFile({
            filename: path.join(__dirname, "logs", combinedLog + "-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "7d",
            zippedArchive: true,
        }),
    ],
});

// If not in production, log debug info
if (env.ENV !== "production") {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

export default logger;
