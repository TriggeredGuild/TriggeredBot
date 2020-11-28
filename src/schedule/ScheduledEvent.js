class ScheduledEvent {
	constructor(client, when, what, args, pending) {
		// Validate all options passed to the constructor
		this.constructor.validateOptions(client, when, what, args, pending);

		this.client = client;
		this.when = when;
		this.what = what;
		this.args = args;
		this.pending = pending;
	}

	run() {
		this.client.logger.info(`Persistent Event: ${this.what} has just triggered.`);
	}

	static validateOptions(client, when, what, args, pending) {
		// Client and Options validation
		if (!client) throw new Error('No client was found.');
		if (typeof what !== 'string') throw new TypeError('ScheduledEvent What is not a string');
		if (typeof args !== 'object') throw new TypeError('ScheduledEvent arguments are not an object');
		if (typeof pending !== 'boolean') throw new TypeError('ScheduledEvent pending is not a boolean');
	}
}

module.exports = ScheduledEvent;