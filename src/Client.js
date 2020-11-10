const Discord = require('discord.js');
const { readdir, readdirSync } = require('fs');
const { join, resolve } = require('path');

class Client extends Discord.Client {
	constructor(config, options = {}) {
		super(options);

		// Create logger for client instance
		this.logger = require('./utils/logger.js');

		// Create database for client instance
		this.db = require('./utils/db.js');

		this.commands = new Discord.Collection();

		this.token = config.token;
		this.ownerId = config.ownerId;
		this.prefix = config.prefix;

		this.logger.info('Initializing...');
	}

	loadEvents(path) {
		readdir(path, (err, files) => {
			if (err) this.logger.error(err);
			files = files.filter(f => f.split('.').pop() === 'js');
			if (files.length === 0) return this.logger.warn('No events found');
			this.logger.info(`${files.length} event(s) found...`);
			files.forEach(f => {
				const eventName = f.substring(0, f.indexOf('.'));
				const event = require(resolve(__basedir, join(path, f)));
				super.on(eventName, event.bind(null, this));
				delete require.cache[require.resolve(resolve(__basedir, join(path, f)))]; // Clear cache
				this.logger.info(`Loading event: ${eventName}`);
			});
		});
		return this;
	}

	loadCommands(path) {
		this.logger.info('Loading commands...');

		readdirSync(path).filter(f => !f.endsWith('.js')).forEach(dir => {
			const commands = readdirSync(resolve(__basedir, join(path, dir))).filter(f => f.endsWith('.js'));
			commands.forEach(f => {
				const Command = require(resolve(__basedir, join(path, dir, f)));
				const command = new Command(this);
				if (command.name && !command.disabled) {
					this.commands.set(command.name, command);
				} else {
					this.logger.warn('${f} failed to load.');
					return;
				}
			});
		});

		this.logger.info('Commands Loaded Succesfully.');
		return this;
	}

	isOwner(user) {
		if (user.id === this.ownerId) return true;
		else return false;
	}
}

module.exports = Client;