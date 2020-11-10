module.exports = (client, message) => {
	// Modify this to be a prefix regex check later, this will do for the moment
	if (message.content.startsWith(client.prefix) && !message.author.bot) {
		const args = message.content.slice(client.prefix.length).split(/ +/);
    	const cmd = args.shift().toLowerCase();

    	let command = client.commands.get(cmd);
    	if (command) {
    		return command.run(message, args);
    	}
	}
};