const { createLogger, format, transports } = require('winston');
const path = require('path');

// Log formatting, generic from StackExchange
const logFormat = format.printf((info) => {
	const { timestamp, level, label, message, ...rest } = info;
	let log = `${timestamp} - ${level} [${label}]: ${message}`;

	// Check if rest is an object
	if (!( Object.keys(rest).length === 0 && rest.constructor === Object )) {
		log = `${log}\n${JSON.stringify(rest, null, 2)}`.replace(/\\n/g, '\n');
	}

	return log;
});

const logger = createLogger({
	level: 'debug',
	format: format.combine(
		format.errors({ stack: true }),
		format.label({ label: path.basename(process.mainModule.filename) }),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				logFormat
			)
		}),
		new transports.File({
			filename: path.join(__basedir, 'logs/full.log'),
			level: 'info',
			format: logFormat,
		}),
		new transports.File({
			filename: path.join(__basedir, 'logs/error.log'),
			level: 'warn',
			format: logFormat,
		})
	]
});

module.exports = logger;