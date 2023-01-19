const Discord = require("discord.js");
const { cp } = require("fs");

module.exports = {

    name: "buy",
    description: "permet d'acheter un objet",
    permission: "Aucune",
    dm: true,
    category: "economie",
    options: [
        {
            type: "string",
            name: "objet",
            description: "l'objet a acheter",
            required: true,
            autocomplete: false
        },
        {
            type: "number",
            name: "nombre",
            description: "le nombre d'objet a acheter",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, member) {

        try {

            let objet = args.getString("objet")
            let nombre = args.getNumber("nombre")

            const allowedActions = ["jeton"];
            
            let db = bot.db;

            let embed_echecsolde = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Pay`)
            .setDescription(`${message.user.tag} tu ne posséde pas asser d'argent pour effectuer cette transaction`)

            let embed_echec = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Création Compte`)
            .setDescription(`${message.user.tag} tu ne posséde pas de compte fait /create pour en avoir un`)

            let embed_echec2 = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Création Compte`)
            .setDescription(`${message.user.tag} choisie un objet parmis cette liste : ` + allowedActions.join(", "))
            
            db.query(`SELECT * FROM inventaire WHERE membre = '${message.user.id}'`, async (err, req) => {

                if(req.length > 0) {

                    if (objet == 'jeton') {
                        db.query(`SELECT * FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {
                            db.query(`SELECT argent FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {
                                compte = req[0].argent 
                                resultat = compte - nombre
                                if (resultat >= 0){
                                    db.query(`UPDATE compte SET argent = ${resultat} WHERE membre = '${message.user.id}'`)
                                    db.query(`SELECT jeton FROM inventaire WHERE membre = '${message.user.id}'`, async (err, req) => {
                                        retour = req[0].jeton
                                        achat = retour + nombre
                                        db.query(`UPDATE inventaire SET jeton = ${achat} WHERE membre = '${message.user.id}'`)
                                        let embed_argent = new Discord.EmbedBuilder()
                                        .setColor(bot.color)
                                        .setTitle(`Pay`)
                                        .setDescription(`${message.user.tag} tu a acheter ${nombre} jeton, tu posséde maintenant ${achat} jeton`)
                                        await message.reply({embeds: [embed_argent]})
                                    }) 

                                } else await message.reply({embeds: [embed_echecsolde]})
                            })
                        })
                    } else await message.reply({embeds: [embed_echec2]})

                } else await message.reply({embeds: [embed_echec]})
            }) 
        } catch (err){

            return console.log(err);
        }
    }
}