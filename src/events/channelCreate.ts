import { EmbedBuilder, Events, GuildChannel, time } from 'discord.js';

export default {
    name: Events.ChannelCreate,
    once: false,
    async execute(channel: GuildChannel) {
        try {
            if (!channel.guild) return;

            const logChannel = channel.guild.channels.cache.get(
                Bun.env.logChannelId,
            );

            const embedMessage = new EmbedBuilder()
                .setColor('Greyple')
                .setAuthor({
                    name: `⏫ Channel created`,
                })
                .setDescription(
                    `Channel: <#${channel.id}> (${channel.id})\n\nCreated: ${time(channel.createdAt)}`,
                );

            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @ChannelCreate event\n\n", err);
        }
    },
};
