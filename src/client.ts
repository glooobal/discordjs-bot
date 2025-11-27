import { Client, Collection } from 'discord.js';
import type { ClientOptions } from 'discord.js';

import { connect } from 'mongoose';

import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

import type { Command } from './types/Command';

export class ExtendedClient extends Client {
    commands: Collection<string, Command>;

    constructor(options: ClientOptions) {
        super(options);

        this.commands = new Collection();
    }

    async loadEvents() {
        const eventsPath = join(import.meta.dir, 'events');
        const eventFiles = await readdir(eventsPath);

        for (const file of eventFiles) {
            if (!file.endsWith('.ts')) continue;

            const event = (await import(join(eventsPath, file))).default;

            if (event.once) {
                this.once(event.name, (...args) =>
                    event.execute(...args, this),
                );
            } else {
                this.on(event.name, (...args) => event.execute(...args, this));
            }
        }
    }

    async loadCommands() {
        const commandsPath = join(import.meta.dir, 'interactions', 'commands');
        const commandFiles = await readdir(commandsPath);

        for (const file of commandFiles) {
            if (!file.endsWith('.ts')) continue;

            const command = (await import(join(commandsPath, file))).default;

            if (command?.data && command?.execute) {
                this.commands.set(command.data.name, command);
            }
        }
    }

    async connectDatabase() {
        try {
            await connect(Bun.env.mongoUri);
        } catch (err) {
            console.error('Can\'t connect to MongoDB, check your .env configuration\n\n', err);
            process.exit(0)
        }
    }

    async init() {
        await this.loadEvents();
        await this.loadCommands();

        await this.login(Bun.env.discordToken);
    }
}
