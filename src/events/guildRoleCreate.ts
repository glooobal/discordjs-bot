import { EmbedBuilder, Events, Role } from 'discord.js';

export default {
    name: Events.GuildRoleCreate,
    once: false,
    async execute(role: Role) {
        const logChannel = role.guild.channels.cache.get(
            Bun.env.logChannelId,
        );

        const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({
                name: `⏫ Role created`
            })
            .setDescription(`${role.name} (${role.id})`)
            .setTimestamp();

        if (logChannel?.isTextBased()) {
            logChannel.send({ embeds: [embedMessage] });
        }
    },
};
