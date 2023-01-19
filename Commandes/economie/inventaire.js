const Discord = require("discord.js")

module.exports = {

    name: "inventaire",
    description: "voir votre inventaire",
    permission: "Aucune",
    dm: true,
    category: "economie",

    async run(bot, message, args, member) {

        try {

            let embed_echec = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Création Compte`)
            .setDescription(`${message.user.tag} tu ne posséde pas de compte merci d'en créer un avec /create`)

            let db = bot.db;
            
            db.query(`SELECT * FROM inventaire WHERE membre = '${message.user.id}'`, async (err, req) => {
                
                if(req.length > 0) {
                
                    db.query(`SELECT jeton FROM inventaire WHERE membre = '${message.user.id}'`, async (err, req) => {
                        
                        let embed_argent = new Discord.EmbedBuilder()
                        .setColor(bot.color)
                        .setTitle(`Votre inventaire`)
                        .addFields({ name: 'jeton', value: `${req[0].jeton} jeton` })
                        await message.reply({embeds: [embed_argent]})   
                    })
                }
                else await message.reply({embeds: [embed_echec]})
            }) 
        } catch (err){

            return console.log(err);
        }
    }
}