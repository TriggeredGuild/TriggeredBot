const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class RoleInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roleinfo',
			usage: 'roleinfo <role mention/ID>'
		});
	}

	run(message, args) {
		const role = this.getRoleFromMention(message, args[0]) || message.guild.roles.cache.get(args[0]);
		if (!role)
			return this.sendErrorMessage(message, 0, 'Please mention a role or provide a valid role ID');
	}
};