const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const moment = require('moment')

module.exports = (bot, guild) => { // en 
    
    moment.locale();     
    var tempse = moment(guild.createdAt).format('LLL'); 
    let db = bot.db

    db.query(`SELECT * FROM server WHERE guild = '${guild.id}'`,async(err, req) => {
        if (req.length < 1){
            
            db.query(`INSERT INTO server (guild, captcha) VALUES (${guild.id}, 'false')`)
        } 
    })

    let embed = new EmbedBuilder()
        .setTitle("J'ai été ajouté sur un serveur :") 
        .addFields({ name: "Le nom de ce serveur est :", value: `🪪 ${guild.name}`, inline: false })
        .addFields({ name: "Date de création du serveur :", value: `⏲️ ${tempse}`, inline: false })
        .addFields({ name: "Nombre de boost :", value: `💰 ${guild.premiumSubscriptionCount}`, inline: false })
        .addFields({ name: "Membres totaux :", value: `👥 ${guild.memberCount}`, inline: false })
        .addFields({ name: "Humain :", value: `👤 ${guild.members.cache.filter(member => !member.user.bot).size}`, inline: false })
        .addFields({ name: "Bot :", value: `🤖 ${guild.members.cache.filter(member => member.user.bot).size}`, inline: false })
        .addFields({ name: "Nombre de role :", value: `🧙🏼‍♂️ ${guild.roles.cache.size}`, inline: false })
        .addFields({ name: "Nombre de serveur que le bot regarde :", value: `🤖 ${bot.guilds.cache.size}`, inline: false })
        .addFields({ name: "Nombre de membre que le bot regarde :", value: `📊 ${bot.users.cache.size}`, inline: false })
        .setColor(bot.color)
    bot.channels.cache.get('1044525589169705021').send({embeds: [embed]}).catch(() => false)

 }    