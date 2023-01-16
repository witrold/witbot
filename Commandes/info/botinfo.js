const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js');
const { cp } = require('fs');
const moment = require('moment')

module.exports = {
    name: "botinfo",
    description: "affiche des information sur le bot",
    permission: "Aucune",
    dm: true,
    category: "Information",

    async run(bot, message, client) {
 
        const moment = require("moment");
        require("moment-duration-format");
        const duration = moment.duration(bot.uptime).format(" D [d] H [h] m [m] s [s]");

        moment.locale('fr')

        let botInfoEmbed = new Discord.EmbedBuilder()
        .setTitle(`Witbot infos`)
        .setColor(bot.color)
        .setDescription(`
        **__▶ Informations sur le bot :__**
        
        > **Le bot est en ligne depuis :** \`${duration}\`
        > 📒 **Le bot est en version :** \`${bot.version}\`
        > 🏷️ **Le bot est sur** \`${bot.guilds.cache.size}\` **serveur**
        > 🏷️ **Le bot modére** \`${bot.users.cache.size}\` **membre**
        `)
    
        await message.reply({embeds: [botInfoEmbed], ephemeral: false})
        
    }
}