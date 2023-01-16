const Discord = require("discord.js")

module.exports = {

    name: "8ball",
    description: "réponse aléatoire",
    permission: "Aucune",
    dm: true,
    category: "fun",
    options: [
        {
            type: "string",
            name: "question",
            description: "La question",
            required: true,
            autocomplete: false
        }
],
    
    
    async run(bot, message, args) {

        try {

            let question = args.getString("question")

            var random_ask = [
                "🎱 Concentre toi et demande moi à nouveau.",
                "🎱 Certainement.",
                "🎱 Oui.",
                "🎱 Mes sources disent que non.",
                "🎱 Je pense que oui.",
                "🎱 Sans aucun doute."
            ];

            let embed_slap = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`${question}`)
            .setDescription(`${random_ask[Math.floor(Math.random() * random_ask.length)]}`)
          
            await message.reply({embeds: [embed_slap]})

        } catch (err){

            return console.log(err);
        }
    }
}
