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
    MessageContent,
} = GatewayIntentBits;

const { Channel, Message, Reaction, User } = Partials;

export const client = new ExtendedClient({
    intents: [
        DirectMessages,
        Guilds,
        GuildMembers,
        GuildMessages,
        GuildMessageReactions,
        GuildModeration,
        GuildVoiceStates,
        MessageContent,
    ],
    partials: [Channel, Message, Reaction, User],
});

await client.init();
