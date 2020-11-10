module.exports = async (client) => {
	client.logger.info('Updating database...');

	// Really strange way of doing this, need to come up with a solution to store the guild id locally
	for (const guild of client.guilds.cache.values()) {
		guild.members.cache.forEach(member => {
			client.db.users.insertRow.run(
				member.id,
				member.user.username,
				member.user.discriminator,
				member.joinedAt.toString(),
				member.user.bot ? 1 : 0
			);
		});
	}

	client.logger.info('Triggered Bot is now running.');
};