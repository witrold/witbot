const Discord = require("discord.js")

module.exports = {

    name: "create",
    description: "creer votre compte bancaire",
    permission: "Aucune",
    dm: true,
    category: "economie",

    async run(bot, message, args) {

        try {

            let embed_argent = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Création Compte`)
            .setDescription(`Le compte de ${message.user.tag} a été créer avec sucée`)

            let embed_echec = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Création Compte`)
            .setDescription(`${message.user.tag} posséde déja un compte`)

            let db = bot.db;
            
            db.query(`SELECT * FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {
                
                if(req.length < 1) {

                db.query(`INSERT INTO compte (guild, membre, argent) VALUES ('${message.guild.id}','${message.user.id}', '0')`)

                db.query(`INSERT INTO inventaire (membre, guild, jeton) VALUES ('${message.user.id}','${message.guild.id}','0')`)

                await message.reply({embeds: [embed_argent]})}
                
                else await message.reply({embeds: [embed_echec]})
            })

        } catch (err){

            return console.log(err);
        }
    }
}