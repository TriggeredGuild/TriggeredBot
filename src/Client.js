const Discord = require('discord.js');

class Client extends Discord.Client {
	constructor(config, options = {}) {
		super(options);

		this.token = config.token;
		this.ownerId = config.ownerId;
		this.prefix = config.prefix;
	}

	isOwner(user) {
		if (user.id === this.ownerId) return true;
		else return false;
	}
}

module.exports = Client;