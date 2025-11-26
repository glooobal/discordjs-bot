declare module 'bun' {
    interface Env {
        discordToken: string;
        discordClientId: string;

        logChannelId: string;
    }
}
