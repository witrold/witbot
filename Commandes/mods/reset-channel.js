const Discord = require("discord.js")

module.exports = {

    name: "reset-channnel",
    description: "Permet de r�initialiser un salon.",
    permission:  Discord.PermissionFlagsBits.ManageChannels,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon clear.",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if(!channel) channel = message.channel;
        if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Aucun salon cit�e !")

        try {
            let message = await channel.clone(parseInt(channel))
            await channel.delete(parseInt(channel))

            await message.reply({content : `Le salon ${channel} � �tait reset par ${user}.`})

        } catch (err) {}

    }
}