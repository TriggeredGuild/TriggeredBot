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

		const embed = new MessageEmbed()
			.setTitle('Role Information')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Role', role, true)
			.addField('Role ID', `\`${role.id}\``, true)
			.addField('Color', `\`${role.hexColor.toUpperCase()}\``, true)
			.addField('Members', `\`${role.members.size}\``, true)
			.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(role.hexColor);
		message.channel.send(embed);
	}
};