import { GatewayIntentBits, Partials } from 'discord.js';

import { ExtendedClient } from './client';

const {
    DirectMessages,
    Guilds,
    GuildMembers,
    GuildMessages,
    GuildMessageReactions,
    GuildModeration,
    GuildVoiceStates,
} = GatewayIntentBits;

const { Channel, Message, Reaction, User } = Partials;

export const client = new ExtendedClient({
    intents: [Guilds],
    partials: [Channel, Message, Reaction, User],
});

await client.init();
