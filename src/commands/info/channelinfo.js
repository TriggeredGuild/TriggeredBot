const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class ChannelInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'channelinfo',
			usage: 'channelinfo <channel mention/ID>'
		});
	}

	run(message, args) {
		let channel = this.getChannelFromMention(message, args[0]) || message.guild.channels.cache.get(args[0]);
		if (channel) {
			args.shift();
		} else channel = message.channel;

		const embed = new MessageEmbed()
			.setTitle('Channel Information')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('Channel', channel, true)
			.addField('Channel ID', `\`${channel.id}\``, true)
			.addField('Type', `\`${channel.type}\``, true)
			.addField('Members', `\`${channel.members.size}\``, true)
			.setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		message.channel.send(embed);
	}
};