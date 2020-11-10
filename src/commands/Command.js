class Command {
	constructor(client, options) {
		this.client = client
		this.name = options.name
	}

	run(message, args) {
		throw new Error('The ${this.name} command has no run() method');
	}

	static validateOptions(client, options) {
		// Client and Options validation
		if (!client) throw new Error('No client was found.');
		if (typeof options !== 'object') throw new TypeError('Command options is not an Object');

		// Name validation
		if (typeof options.name !== 'string') throw new TypeError('Command name is not a string');
		if (options.name !== options.name.toLowerCase()) throw new Error('Command name is not lowercase');
	}
}

module.exports = Command;