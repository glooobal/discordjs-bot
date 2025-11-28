import {
    Collection,
    EmbedBuilder,
    Events,
    Message,
    type Snowflake,
} from 'discord.js';

export default {
    name: Events.MessageBulkDelete,
    once: false,
    async execute(messages: Collection<Snowflake, Message>) {
        try {
            if (messages.size === 0) return;

            const firstMessage = messages.first();
            if (!firstMessage) return;

            const logChannel = firstMessage.guild?.channels.cache.get(
                Bun.env.logChannelId,
            );

            const embedMessage = new EmbedBuilder()
                .setColor('Greyple')
                .setAuthor({
                    name: `⏫ Message/s deleted`,
                })
                .setDescription(
                    `${messages.size} messages deleted in ${firstMessage.channel}`,
                );

            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @MessageBulkDelete event\n\n", err);
        }
    },
};
