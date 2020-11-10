const config = require('./config.json');
const Client = require('./src/Client.js');

global.__basedir = __dirname;

// Client setup
const client = new Client(config);

// Initialize client
function init() {
	client.loadEvents('./src/events');
	client.loadCommands('./src/commands');
	client.login(client.token);
}

init();