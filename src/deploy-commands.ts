import { REST, Routes } from 'discord.js';

import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function deployCommands() {
    const commandsPath = join(import.meta.dir, 'interactions', 'commands');
    const commandFiles = await readdir(commandsPath);

    const commands = [];

    for (const file of commandFiles) {
        if (!file.endsWith('.ts')) continue;

        const command = (await import(join(commandsPath, file))).default;

        if (command?.data && command?.execute) {
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST({ version: '10' }).setToken(Bun.env.discordToken);

    try {
        await rest.put(Routes.applicationCommands(Bun.env.discordClientId), {
            body: commands,
        });
    } catch (err) {
        console.error(err);
    }
}

await deployCommands();
