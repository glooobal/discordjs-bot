import { EmbedBuilder, Events, GuildMember } from 'discord.js';

export default {
    name: Events.GuildMemberRemove,
    once: false,
    async execute(member: GuildMember) {
        const logChannel = member.guild.channels.cache.get(
            Bun.env.logChannelId,
        );

        const embedMessage = new EmbedBuilder()
            .setColor('Greyple')
            .setAuthor({
                name: `⏫ Member left`,
            })
            .setDescription(`${member.user.username} (${member.user.id})`)
            .setTimestamp();

        if (logChannel?.isTextBased()) {
            logChannel.send({ embeds: [embedMessage] });
        }
    },
};
