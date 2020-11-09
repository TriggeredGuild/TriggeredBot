const Database = require('better-sqlite3');
const db = new Database(__basedir + '/data/db.sqlite');

/** -------
  * TABLES
  * ------- */

// Users Table
db.prepare(`
	CREATE TABLE IF NOT EXISTS users (
		user_id TEXT,
		user_name TEXT,
		user_discriminator TEXT,
		date_joined TEXT,
		bot INTEGER,
		PRIMARY KEY (user_id)
	);
`).run();


/** --------------------
  * PREPARED STATEMENTS
  * -------------------- */

const users = {
	insertRow: db.prepare(`
		INSERT OR IGNORE INTO users (
			user_id,
			user_name,
			user_discriminator,
			date_joined,
			bot
		) VALUES (?, ?, ?, ?, ?);
	`),

	// Selects
	selectRow: db.prepare('SELECT * FROM users WHERE user_id = ?;'),

	// Updates
	updateUser: db.prepare('UPDATE users SET user_name = ?, user_discriminator = ? WHERE user_id = ?;')
};

module.exports = {
	users
};