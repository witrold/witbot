const Discord = require("discord.js");
const { cp } = require("fs");

module.exports = {

    name: "pay",
    description: "envoyer de l'argent a un utilisateur",
    permission: "Aucune",
    dm: true,
    category: "economie",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a envoyer l'argent",
            required: true,
            autocomplete: false
        }, {
            type: "number",
            name: "argent",
            description: "l'argent a envoyer'",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, member) {

        try {

            let user = args.getUser('membre')
            
            let argent = args.getNumber("argent")
            
            let db = bot.db;
            
            let embed_echec = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Pay`)
            .setDescription(`${message.user.tag} la personne a qui tu essaye d'envoyer de l'argent ne poseede pas de compte`)

            let embed_echecsolde = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Pay`)
            .setDescription(`${message.user.tag} tu ne posséde pas asser d'argent pour effectuer cette transaction`)
            
            db.query(`SELECT * FROM compte WHERE membre = '${user.id}'`, async (err, req) => {

                if(req.length > 0) {

                    db.query(`SELECT * FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {    
                                            
                            db.query(`SELECT argent FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {
                                    
                                compte = req[0].argent 
                                resultat = compte - argent

                                if (resultat >= 0){
                                    db.query(`UPDATE compte SET argent = ${resultat} WHERE membre = '${message.user.id}'`)
                                    db.query(`SELECT argent FROM compte WHERE membre = '${user.id}'`, async (err, req) => {
                                        receveur = req[0].argent 
                                        final = receveur + argent
                                        db.query(`UPDATE compte SET argent = '${final}' WHERE membre = '${user.id}'`)
                                        let embed_argent = new Discord.EmbedBuilder()
                                        .setColor(bot.color)
                                        .setTitle(`Pay`)
                                        .setDescription(`${message.user.tag} a envoyer ${argent} € a ${user.tag}`)
                                        await message.reply({embeds: [embed_argent]})   
                                    })

                                } else await message.reply({embeds: [embed_echecsolde]})
                            })
                    })
    
                } else await message.reply({embeds: [embed_echec]})
            }) 
        } catch (err){

            return console.log(err);
        }
    }
}