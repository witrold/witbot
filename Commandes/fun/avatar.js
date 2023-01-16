const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Avoir l'avatar de quelqu'un",
    permission: "Aucune",
    dm: true,
    category: "fun",
    options: [
        {
        type: "user",
        name: "utlisateur",
        description: "L'utilisateur choisis",
        required: true,
        autocomplete: false
        }
    ],
    
    async run(bot, message, args) {
        let user = args.getUser(`utlisateur`)
        if(!user) return message.reply("Utlisateur non valide")
        const exampleEmbed = new EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`${user.username}`)
        .setDescription(`Avatar de ${user.tag}`)
       .setTimestamp()
        .setImage(user.displayAvatarURL({size: 512}))
    .setFooter({ text: `Avatar de ${user.tag}`, iconURL: (user.displayAvatarURL({dynamic: true}))});
        message.reply({embeds: [exampleEmbed]});
    }
}