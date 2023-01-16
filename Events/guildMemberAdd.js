const Discord = require("discord.js")
    
module.exports = async(bot, member) =>{

    let db = bot.db
    
    db.query(`SELECT * FROM server WHERE guild = '${member.guild.id}'`,async(err, req) => {
        
        if (req.length < 1 || Boolean(req[0].captcha) === false) return;

        let channel = member.guild.channels.cache.get(req[0].captcha)    
        if(!channel) return;
        
        await channel.permissionOverwrites.create(member.user, {
            SendMessages: true,
            ViewChannel: true,
            ReadMessageHistory: true,

        })

        let captcha = await bot.function.generateCaptcha()

        let msg = await channel.send({content: `${member}, vous avez 2 minutes pour compléter le captcha.`,files: [new Discord.AttachmentBuilder((await captcha.canvas).toBuffer(), {name: "captcha.png"})]})
        
        try {

            let filter = m => m.author.id === member.user.id;
            let response = (await channel.awaitMessages({filter, max: 1, time:120000, errors: ["time"]})).first()

            if(response.content === captcha.text){

                await msg.delete()
                await response.delete()
                try {await member.user.send("Vous avez réussi le captcha !")} catch (err) {}
                await channel.permissionOverwrites.delete(member.user.id)

            } else {

                await msg.delete()
                await response.delete()
                try {
                await member.user.send("Vous avez échouer le captcha !")
                } catch (err) {
                await channel.permissionOverwrites.delete(member.user.id)
                await member.kick("Erreur Captcha")
                }

            }

        } catch (err) {

            await msg.delete()
            try {
                await member.user.send("Vous avez mis trop de temps pour completer le captcha !")
            } catch (err) {
                await channel.permissionOverwrites.delete(member.user.id)
                await member.kick("Pas fait le captcha")
            }
            
        }

    })
}