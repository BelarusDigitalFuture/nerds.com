const winston = require('winston');

const config = require('../config');

const { format } = winston;
const { combine, timestamp, printf } = format;

const logger = winston.createLogger({
  level: config.winston.level,
  format: combine(
    format.colorize(),
    timestamp(),
    printf((info) => {
      let formatted = `${info.timestamp} ${info.level}:`;
      if (info instanceof Error) {
        formatted = `${formatted} ${info.stack}`;
      } else {
        formatted = `${formatted} ${info.message}`;
      }
      return formatted;
    }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;
