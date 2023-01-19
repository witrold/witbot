const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require('./Loaders/loadCommands')
const loadEvents = require('./Loaders/loadEvents')
const Player = require('discord-player')
const config = require('./config')
require(`./anti-crash.js`)();

bot.version = "0.9.4"
bot.color = "DarkBlue";
bot.function = {
    generateCaptcha: require("./Fonctions/generateCaptcha")
}
bot.player = new Player.Player(bot, {
    leaveOnEnd: true,
    leaveOnEmpty: true,
    initialVolume: 10,
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    },
});

bot.login(config.token)
loadCommands.bind(bot)('./Commandes/');
loadEvents(bot)

