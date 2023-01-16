const Discord = require('discord.js');

module.exports = {

    name: "say",
    description: "envoie un message avec le bot",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "string",
            name: "message",
            description: "Le message que tu veux envoyer avec le bot",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args) {

        let messages = args.getString('message')

        try{
            
            let SuccesEmbedBot = new Discord.EmbedBuilder()
                .setDescription(":white_check_mark: **Message envoyé avec succés!**")
                .setColor(bot.color)

            message.reply({embeds: [SuccesEmbedBot], ephemeral: true})
            await message.channel.send({content: `${messages}`})
        
        }catch(err) {console.log(err)}
    }
}