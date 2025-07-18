// Import pino logger
import pino from "pino";

// Create a pino logger instance
export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info", // Set log level from environment variable or default to 'info'
    transport:
      process.env.NODE_ENV === "production"
        ? undefined
        : {
            target: "pino-pretty", // Use pino-pretty for development environment
            options: {
              colorize: true, // Colorize output for better readability
              translateTime: "SYS:standard", // Format timestamps in a readable way
              ignore: "pid,hostname", // Ignore pid and hostname in logs
            },
          },
    timestamp: pino.stdTimeFunctions.isoTime, // Use ISO timestamp format
  },
);
