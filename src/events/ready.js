module.exports = async (client) => {
	client.logger.info('Updating database...');

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
};