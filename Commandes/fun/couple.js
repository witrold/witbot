const Discord = require("discord.js")

module.exports = {

    name: "couple",
    description: "chance d'étre compatible",
    permission: "Aucune",
    dm: false,
    category: "fun",
    options: [
        {
            type: "user",
            name: "personneune",
            description: "Le premier membre",
            required: true,
            autocomplete: false
        },
        {
            type: "user",
            name: "personnedeux",
            description: "Le deuxiéme membre",
            required: true,
            autocomplete: false
        }
],
    
    
    async run(bot, message, args) {

        try {

            let premiere = args.getUser("personneune")
            let deuxieme = args.getUser("personnedeux")

            var min=1; 
            var max=100;  
            var random = Math.floor(Math.random() * (max - min)) + min; 

            let embed_slap = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Couple :`)
            .setDescription(`Le pourcentage de change que ${premiere.tag} finit en couple avec ${deuxieme.tag} est de ${random}% ❤`)
          
            await message.reply({embeds: [embed_slap]})

        } catch (err){

            return console.log(err);
        }
    }
}
