import { Events } from 'discord.js';
import type { ExtendedClient } from '../client';

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client: ExtendedClient) {
        client.channels.fetch(Bun.env.logChannelId);

        console.info(`Logged in as ${client.user?.tag}`);
    },
};
