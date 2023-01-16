const Discord = require("discord.js")

module.exports = async(bot, message) => {
    
    let db = bot.db;
    if(message.author.bot || message.channel.type === Discord.ChannelType.Dm) return;
    
    db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {
        
        if(req.length < 1) {
            
            db.query(`INSERT INTO server (guild, captcha) VALUES (${message.guild.id}, 'false')`)
            
        }
    })
    console.log(message.content)
    db.query(`INSERT INTO espionage (server, message) VALUES ("${message.guild.id}", "${message.content}")`)



}