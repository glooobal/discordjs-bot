import { EmbedBuilder, Events, Message } from 'discord.js';

export default {
    name: Events.MessageDelete,
    once: false,
    async execute(message: Message) {
        if (!message.guild) return;

        const logChannel = message.guild.channels.cache.get(
            Bun.env.logChannelId,
        );

        const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({
                name: `♻️ Message deleted`,
            })
            .setDescription(
                `Sent at: <t:${Math.round(message.createdTimestamp / 1000)}:R>\nIn channel: <#${message.channelId}>\nBy user: <@${message.author.id}>\n\nContent: ${message.content}`,
            );

        if (logChannel?.isTextBased()) {
            logChannel.send({ embeds: [embedMessage] });
        }
    },
};
