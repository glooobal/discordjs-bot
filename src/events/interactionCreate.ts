import { Events } from 'discord.js';
import type { Interaction } from 'discord.js';
import type { ExtendedClient } from '../client';

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction, client: ExtendedClient) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            const replyData = {
                content: 'Error executing command.',
                ephemeral: true,
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(replyData);
            } else {
                await interaction.reply(replyData);
            }
        }
    },
};
