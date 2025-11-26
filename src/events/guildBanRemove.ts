import { EmbedBuilder, Events, GuildBan } from 'discord.js';

export default {
    name: Events.GuildBanRemove,
    once: false,
    async execute(ban: GuildBan) {
        const logChannel = ban.guild.channels.cache.get(Bun.env.logChannelId);

        const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({
                name: `⏫ User has been unbanned`,
            })
            .setDescription(`${ban.user.username} (${ban.user.id})`)
            .setTimestamp();

        if (logChannel?.isTextBased()) {
            logChannel.send({ embeds: [embedMessage] });
        }
    },
};
