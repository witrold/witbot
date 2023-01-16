const Discord = require("discord.js")

module.exports = {

    name: "work",
    description: "effectuer votre travail de la journée",
    permission: "Aucune",
    dm: true,
    category: "economie",

    async run(bot, message, args) {

        try {

            let embed_echec = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Création Compte`)
            .setDescription(`${message.user.tag} tu ne posséde pas de compte merci d'en créer un avec /create`)

            let db = bot.db;

            var min=20; 
            var max=100;  
            var random = Math.floor(Math.random() * (max - min)) + min; 
            db.query(`SELECT * FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {    
                
                if(req.length > 0) {

                    db.query(`SELECT argent FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {
                        
                        compte = req[0].argent

                        solde = compte + random

                        db.query(`UPDATE compte SET argent = ${solde} WHERE membre = '${message.user.id}'`)

                        let embed_argent = new Discord.EmbedBuilder()
                        .setColor(bot.color)
                        .setTitle(`Travaille`)
                        .setDescription(`${message.user.tag} a gagner ${random} € , il posséde maintenant ${solde} €`)
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
