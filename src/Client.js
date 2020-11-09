const Discord = require('discord.js');

class Client extends Discord.Client {
	constructor(config, options = {}) {
		super(options);

		// Create logger for client instance
		this.logger = require('./utils/logger.js');

		// Create database
		this.db = require('./utils/db.js');

		this.token = config.token;
		this.ownerId = config.ownerId;
		this.prefix = config.prefix;

		this.logger.info('Initializing...');
	}

	isOwner(user) {
		if (user.id === this.ownerId) return true;
		else return false;
	}
}

module.exports = Client;