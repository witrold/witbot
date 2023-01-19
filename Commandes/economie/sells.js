const Discord = require("discord.js");
const { cp } = require("fs");

module.exports = {

    name: "sells",
    description: "consulter les objets vandable",
    permission: "Aucune",
    dm: true,
    category: "economie",

    async run(bot, message, args, member) {

        try {
        
            let embed_sell = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Sell`)
            .setDescription(`/sell + l'objet : pour effectuer la vente`)
            .addFields({ name: 'jeton', value: 'pour vendre des jeton de casino 1 jeton = 1€'})

            await message.reply({embeds: [embed_sell]})   
                                    
        } catch (err){

            return console.log(err);
        }
    }
}