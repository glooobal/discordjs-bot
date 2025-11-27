declare module 'bun' {
    interface Env {
        discordToken: string;
        discordClientId: string;

        mongoUri: string;

        logChannelId: string;
    }
}
