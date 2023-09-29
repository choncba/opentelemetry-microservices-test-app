const { format, createLogger, transports } = require("winston");

const { combine, timestamp, printf } = format;

const timezoned = () => {
  return new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires'
  });
}


const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(timestamp({ format: timezoned }), customFormat),
  transports: [new transports.Console()],
});

module.exports = logger;