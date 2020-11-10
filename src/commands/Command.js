const { MessageEmbed } = require('discord.js');

class Command {
	constructor(client, options) {
		this.client = client

		this.name = options.name
		this.usage = options.usage || options.name;

		// Array of potential command error types
		this.errorTypes = ['Invalid Argument', 'Command Failure'];
	}

	run(message, args) {
		throw new Error('The ${this.name} command has no run() method');
	}

	sendErrorMessage(message, errorType, reason, errorMessage = null) {
		errorType = this.errorTypes[errorType];
		const prefix = this.client.prefix;
		const embed = new MessageEmbed()
			.setAuthor(`${message.author.tag}`, message.author.displayAvatarUrl({ dynamic: true }))
			.setTitle(`${fail} Error: \`${this.name}\``)
			.setDescription(`\`\`\`diff\n- ${errorType}\n+ ${reason}\`\`\``)
			.addField('Usage', `\`${prefix}${this.usage}\``)
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);
		if (errorMessage) embed.addField('Error Message', `\`\`\`${errorMessage}\`\`\``);
		message.channel.send(embed);
	}

	static validateOptions(client, options) {
		// Client and Options validation
		if (!client) throw new Error('No client was found.');
		if (typeof options !== 'object') throw new TypeError('Command options is not an Object');

		// Name validation
		if (typeof options.name !== 'string') throw new TypeError('Command name is not a string');
		if (options.name !== options.name.toLowerCase()) throw new Error('Command name is not lowercase');

		// Usage
		if (options.usage && typeof options.usage !== 'string') throw new TypeError('Command usage is not a string');
	}
}

module.exports = Command;