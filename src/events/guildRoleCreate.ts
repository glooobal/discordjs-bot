import { EmbedBuilder, Events, Role, time } from 'discord.js';

export default {
    name: Events.GuildRoleCreate,
    once: false,
    async execute(role: Role) {
        try {
            const logChannel = role.guild.channels.cache.get(
                Bun.env.logChannelId,
            );

            const embedMessage = new EmbedBuilder()
                .setColor('Greyple')
                .setAuthor({
                    name: `⏫ Role created`,
                })
                .setDescription(
                    `${role.name} (${role.id})\n\nCreated: ${time(role.createdAt)}`,
                );

            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @GuildRoleCreate event\n\n", err);
        }
    },
};
