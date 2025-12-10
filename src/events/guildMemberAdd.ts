import { EmbedBuilder, Events, GuildMember, time } from 'discord.js';

export default {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member: GuildMember) {
        try {
            const logChannel = member.guild.channels.cache.get(
                Bun.env.logChannelId,
            );

            const embedMessage = new EmbedBuilder()
                .setColor('Greyple')
                .setAuthor({
                    name: `⏫ Member joined`,
                })
                .setDescription(
                    `User: ${member.user.username} (${member.user.id})\n\nCreated: ${time(member.user.createdAt)}\nJoined: ${time(new Date())}`,
                );

            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @GuildMemberAdd event\n\n", err);
        }
    },
};
