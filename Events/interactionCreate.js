const Discord = require('discord.js')
const transcript = require("discord-html-transcripts")
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, SelectMenuBuilder } = require("discord.js")

module.exports = async (bot, interaction) => {

    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()
        
        if(interaction.commandName === "help") {

            let choices = bot.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? bot.commands.map(cmd => ({name: cmd.name, value: cmd.name})) : choices.map(choice => ({name: choice.name, value: choice.name})))
        }

        
        if(interaction.commandName === "setcaptcha") {

            let choices = ["on", "off"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(choice => ({name: c, value: c})))
        }
    }
    
    if(interaction.type === Discord.InteractionType.ApplicationCommand) {
        
        const command = interaction.client.commands.get(interaction.commandName);
        command.run(bot, interaction, interaction.options, bot.db)
    }

}
 
