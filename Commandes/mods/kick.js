const { booleanTrue } = require('@sapphire/shapeshift')
const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    
    name: "kick",
    description: "kick",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a kick",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "la raison du kick",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {
         
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre a kick")
        let member = message.guild.members.cache.get(user.id)
        if(!user) return message.reply("Pas de membre a kick")
            
        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournit";

        if(message.user.id === user.id) return message.reply("essaie pas de te kick")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne peux pas kick le propriéter du serveur !!!")
        if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !!!")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas kick cette personne !!!")

    //////////////////////////////////////////// Mise en place des embed /////////////////////////////////////////////////////////// 
        
        const kickserveur = new EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

        const kickpriver = new EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        try {await user.send({ embeds: [kickpriver] })} catch(err) {}

        await message.reply({ embeds: [kickserveur] })

        await member.kick(reason)
    }
}

