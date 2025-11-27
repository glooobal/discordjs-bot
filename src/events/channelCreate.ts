import { EmbedBuilder, Events, GuildChannel } from 'discord.js';

export default {
    name: Events.ChannelCreate,
    once: false,
    async execute(channel: GuildChannel) {
        if (!channel.guild) return;

        const logChannel = channel.guild.channels.cache.get(
            Bun.env.logChannelId,
        );

        const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({
                name: `⏫ Channel created`,
            })
            .setDescription(`<#${channel.id}>`)
            .setTimestamp();

        if (logChannel?.isTextBased()) {
            logChannel.send({ embeds: [embedMessage] });
        }
    },
};
