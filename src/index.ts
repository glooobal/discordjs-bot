import { Client, GatewayIntentBits } from "discord.js";

const discordClient = new Client({
  intents: GatewayIntentBits.Guilds
});

discordClient.login(Bun.env.discordToken);