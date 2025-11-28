import { EmbedBuilder, Events, GuildBan } from 'discord.js';

export default {
    name: Events.GuildBanRemove,
    once: false,
    async execute(ban: GuildBan) {
        try {
            const logChannel = ban.guild.channels.cache.get(
                Bun.env.logChannelId,
            );

            const embedMessage = new EmbedBuilder()
                .setColor('Greyple')
                .setAuthor({
                    name: `⏫ User has been unbanned`,
                })
                .setDescription(`${ban.user.username} (${ban.user.id})`)
                .setTimestamp();

            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @GuildBanRemove event\n\n", err);
        }
    },
};
