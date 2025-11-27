import { Events, Guild as DiscordGuild } from 'discord.js';

import { Guild } from '../models/Guild';

export default {
    name: Events.GuildCreate,
    once: false,
    async execute(discordGuild: DiscordGuild) {
        try {
            let guild = await Guild.findOne({ guildId: discordGuild.id });

            if (!guild) {
                guild = new Guild({
                    guildId: discordGuild.id,
                });
            } else {
                guild.isActive = true;
            }

            await guild.save();
        } catch (err) {
            console.error("Can't save guild from @GuildCreate event\n\n", err);
        }
    },
};
