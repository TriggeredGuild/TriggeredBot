module.exports = async (client, member) => {
	// Log event
	client.logger.info(`${member.guild.name}: ${member.user.tag} has joined the server.`);

	// Update users table
	client.db.users.insertRow.run(
		member.id,
		member.user.username,
		member.user.discriminator,
		member.joinedAt.toString(),
		member.user.bot ? 1: 0
	);
};
