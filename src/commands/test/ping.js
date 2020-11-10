const Command = require('../Command.js');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			usage: 'ping',
		});
	}

	run(message) {
		message.channel.send('Pong!');
	}
}