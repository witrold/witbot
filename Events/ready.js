const Discord = require('discord.js')
const DBD = require("discord-dashboard")
const Theme = require ("dbd-dark-dashboard")
const loadDatabase = require('../Loaders/loadDatabase')
const loadSlashCommands = require('../Loaders/loadSlashCommands')
const config = require("../config")
const dbdDarkDashboard = require('dbd-dark-dashboard')

module.exports = async (bot, client) => {

    bot.db = await loadDatabase()
    bot.db.connect(function () {
        console.log('--------------------------------------------------------');
        console.log("base de données connectée avec succés")
    })
    
    await loadSlashCommands(bot)

    let allcommands = [];
    await bot.commands.forEach(command => allcommands.push({commandName: command.name, commandDescription: command.description }))

    console.log('--------------------------------------------------------');
    console.log(`${bot.user.tag} est bien en ligne`)
    
    
}

