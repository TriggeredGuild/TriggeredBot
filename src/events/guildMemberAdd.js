module.exports = async (client, member) => {
	// Log event
	client.logger.info(`${member.guild.name}: ${member.user.tag} has joined the server.`);

	// Assign automatic role
	const autoRoleId = client.autoRoleId;
	const autoRole = member.guild.roles.cache.get(autoRoleId);
	if (autoRole) {
		try {
			await member.roles.add(autoRole);
		} catch (err) {
			client.logger.error(`${member.guild.name}: Unable to assign the automatic role, please ensure I have the Manage Roles permission.`);
		}
	}

	// Assign random color
	const colors = member.guild.roles.cache.filter(c => c.name.startsWith('#')).array();

	if (colors.length > 0) {
		const color = colors[Math.floor(Math.random() * colors.length)]; // Get color
		try {
			await member.roles.add(color);
		} catch (err) {
			client.logger.error(`${member.guild.name}: Unable to assign the automatic color, please ensure I have the Manage Roles permission.`);
		}
	}

	// Update users table
	client.db.users.insertRow.run(
		member.id,
		member.user.username,
		member.user.discriminator,
		member.joinedAt.toString(),
		member.user.bot ? 1: 0
	);
};
