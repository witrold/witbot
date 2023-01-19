const Discord = require("discord.js");
const { cp } = require("fs");

module.exports = {

    name: "shop",
    description: "consulter les objets achetable",
    permission: "Aucune",
    dm: true,
    category: "economie",

    async run(bot, message, args, member) {

        try {
        
            let embed_shop = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Shop`)
            .setDescription(`/buy + l'objet : pour effectuer l'achat`)
            .addFields({ name: 'jeton', value: 'pour acheter des jeton de casino 1€ = 1 jeton' })

            await message.reply({embeds: [embed_shop]})   
                                    
        } catch (err){

            return console.log(err);
        }
    }
}