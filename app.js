const config = require('./config.json');
const Client = require('./src/Client.js');

global.__basedir = __dirname;

// Client setup
const client = new Client(config);

// Initialize client
function init() {
	client.loadEvents('./src/events');
	client.login(client.token);
}

init();

// All of this is just the testing garbage Jon had running previously, just pasted it in with a modification the prefix variable
// Updated to reflect now logger, just as a test
// Removed the on 'ready' event as it is now captured elsewhere

client.on('message', message => {
    if(!message.content.startsWith(client.prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(client.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    if(cmd === 'ping') {
        message.channel.send('pong!');
    }

    if(cmd == 'marcus') {
        message.channel.send('is gay!');
    }
});