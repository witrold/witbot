const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "serveurinfo",
    description: "affiche des information sur le serveurs",
    permission: "Aucune",
    dm: false,
    category: "Information",

    async run(bot, message) {

        moment.locale('fr')
        var tempse = moment(message.guild.createdAt).format('DD MMMM YYYY : h:mm:ss');
            
        const EmbedServeurCount = new EmbedBuilder()
    .setColor(bot.color)
    .addFields({ name: "Date de création du serveur :", value: `⏲️ ${tempse}`, inline: false })
    .addFields({ name: "Nombre de boost :", value: `💰 ${message.guild.premiumSubscriptionCount}`, inline: false })
    .addFields({ name: "Membres totaux :", value: `👥 ${message.guild.memberCount}`, inline: false })
    .addFields({ name: "Nombre de ban :", value: `🔨 ${(await message.guild.bans.fetch()).size}`, inline: false})
    .addFields({ name: "Humain :", value: `👤 ${message.guild.members.cache.filter(member => !member.user.bot).size}`, inline: false })
    .addFields({ name: "Bot :", value: `🤖 ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: false })
    .addFields({ name: "Nombre de role :", value: `🧙🏼‍♂️ ${message.guild.roles.cache.size}`, inline: false })

    await message.reply({embeds: [EmbedServeurCount]})

    }
}