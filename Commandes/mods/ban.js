const Discord = require('discord.js')
const { cp, truncateSync } = require('fs')
const { EmbedBuilder } = require('discord.js')


module.exports = {
    
    name: "ban",
    description: "ban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a bannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "la raison du ban",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

    
            
        let user = await bot.users.fetch(args._hoistedOptions[0].value)
        if(!user) return message.reply("Pas de membre a banir")
        let member = message.guild.members.cache.get(user.id)
            
        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournit";

        if(message.user.id === user.id) return message.reply("Essaie pas de te banir")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne peux pas ban le propriéter du serveur !!!")
        if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !!!")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas bannir cette personne !!!")
        if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déja ban !!!")
        
        //////////////////////////////////////////// Mise en place des embed /////////////////////////////////////////////////////////// 

        const banserver = new EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`${message.user} a ban ${user.tag} pour la raison : \`${reason}\``)

        const banpriver = new EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`Tu as été ban du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        try {await user.send({ embeds: [banpriver] })} catch(err) {}
            
        await message.reply({ embeds: [banserver] })

        await message.guild.bans.create(user.id, {reason: reason})
        
    }
}