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
                    name: `⏫ Role deleted`,
                })
                .setDescription(
                    `${role.name} (${role.id})\n\nCreated: ${time(role.createdAt)}\n Deleted: ${time(new Date())}`,
                );

            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @GuildRoleDelete event\n\n", err);
        }
    },
};
