const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
	level: 'debug',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(__basedir, 'logs/full.log'),
			level: 'info'
		}),
		new winston.transports.File({
			filename: path.join(__basedir, 'logs/error.log'),
			level: 'warn'
		})
	]
});

module.exports = logger;