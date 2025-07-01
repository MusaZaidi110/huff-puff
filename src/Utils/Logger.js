const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;
const path = require('path');
const fs = require('fs');

// Ensure log directory exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  let log = `${timestamp} [${level}]: ${message}`;
  if (stack) {
    log += `\n${stack}`;
  }
  return log;
});

// Custom format for file output
const fileFormat = printf(({ level, message, timestamp, stack }) => {
  let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  if (stack) {
    log += `\n${stack}`;
  }
  return log;
});

// Create Logger instance
const Logger = createLogger({
  level: 'debug', // minimum level to log
  format: combine(
    errors({ stack: true }), // include stack traces
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  transports: [
    // Console transport (colored output)
    new transports.Console({
      format: combine(
        colorize(),
        consoleFormat
      ),
      level: 'debug' // log everything to console
    }),
    
    // Daily rotating file transport for all logs
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: fileFormat,
      maxsize: 1024 * 1024 * 10, // 10MB
      maxFiles: 14 // keep 14 days of logs
    }),
    
    // Error logs (only errors)
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat,
      maxsize: 1024 * 1024 * 5, // 5MB
      maxFiles: 30 // keep 30 days of error logs
    }),
    
    // HTTP request logs
    new transports.File({
      filename: path.join(logDir, 'http.log'),
      level: 'http',
      format: fileFormat,
      maxsize: 1024 * 1024 * 10, // 10MB
      maxFiles: 7 // keep 7 days of HTTP logs
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(logDir, 'exceptions.log'),
      format: fileFormat
    })
  ],
  rejectionHandlers: [
    new transports.File({
      filename: path.join(logDir, 'rejections.log'),
      format: fileFormat
    })
  ]
});

// Add Morgan HTTP logging to Winston
Logger.stream = {
  write: (message) => {
    Logger.http(message.trim());
  }
};

module.exports = Logger;