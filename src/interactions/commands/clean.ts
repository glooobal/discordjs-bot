import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("clean")
    .setDescription("Delete a number of recent messages from the channel.")
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(99)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger("amount", true);

    if (!interaction.channel || !interaction.channel.isTextBased()) {
      return await interaction.reply({ content: "This command can only be used in text channels.", ephemeral: true });
    }

    const channel = interaction.channel as TextChannel;

    try {
      const deleted = await channel.bulkDelete(amount, true);

      await interaction.reply({
        content: `🧹 Successfully deleted ${deleted.size} messages.`,
      });
    } catch (error) {
      console.error("Error deleting messages:", error);
      await interaction.reply({ content: "Failed to delete messages. Make sure I have the proper permissions.", ephemeral: true });
    }
  },
};
