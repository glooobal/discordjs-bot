import { EmbedBuilder, Events, GuildMember } from 'discord.js';

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
                .setDescription(`${member.user.username} (${member.user.id})`)
                .setTimestamp();

            if (logChannel?.isTextBased()) {
                await logChannel.send({ embeds: [embedMessage] });
            }
        } catch (err) {
            console.error("Can't log @GuildMemberAdd event\n\n", err);
        }
    },
};
