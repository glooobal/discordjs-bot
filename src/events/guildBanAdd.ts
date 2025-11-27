import { EmbedBuilder, Events, GuildBan } from 'discord.js';

export default {
    name: Events.GuildBanAdd,
    once: false,
    async execute(ban: GuildBan) {
        try {
            const logChannel = ban.guild.channels.cache.get(
                Bun.env.logChannelId,
            );

            const embedMessage = new EmbedBuilder()
                .setColor('Greyple')
                .setAuthor({
                    name: `⏫ User has been banned`,
                })
                .setDescription(
                    `User: ${ban.user.username} (${ban.user.id})\nReason: ${ban?.reason || 'not specified'}`,
                )
                .setTimestamp();

            if (logChannel?.isTextBased()) {
                logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @GuildBanAdd event\n\n", err);
        }
    },
};
