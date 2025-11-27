import { Events, Guild as DiscordGuild } from 'discord.js';

import { Guild } from '../models/Guild';

export default {
    name: Events.GuildDelete,
    once: false,
    async execute(discordGuild: DiscordGuild) {
        try {
            let guild = await Guild.findOne({ guildId: discordGuild.id });

            if (guild) {
                guild.isActive = false;

                await guild.save();
            }
        } catch (err) {
            console.error(
                "Can't delete guild from @GuildDelete event\n\n",
                err,
            );
        }
    },
};
