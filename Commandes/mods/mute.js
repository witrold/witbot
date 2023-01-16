const Discord = require('discord.js')
const ms = require('ms')
const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "mute",
    description: "mute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "temps du mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "raison du mute",
            required: true,
            autocomplete: false
        }  
    ],

    async run(bot, message, args) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre !")

        let time = args.getString("temps")
        if(!time) return message.reply("Pas de temps !")
        if(isNaN(ms(time))) return message.reply("Pas le bon format !")
        if(ms(time) > 86400000) return message.reply("Le mute peux pas durée plus de 28 jours")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raion fournis";

        if(message.user.id === user.id) return message.reply("ne te mute pas tous seul")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne peux pas mute le propriéter du serveur !")
        if(!member.moderatable) return message.reply("ne peux pas mute ce membre !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas mute cette personne !")
        if(member.isCommunicationDisabled()) return message.reply("Ce membre est déja mute")

        //////////////////////////////////////////// Mise en place des embed /////////////////////////////////////////////////////////// 
        
        const muteserveur = new EmbedBuilder()
        .setColor(0xFF0000)
        .setDescription(`${message.user} a mute ${user.tag} pendant ${time} pour la raison : \`${reason}\``)

        const mutepriver = new EmbedBuilder()
        .setColor(0xFF0000)
        .setDescription(`Tu as été mute du serveur ${message.guild.name} par ${message.user.tag} pendant ${time} pour la raison : \`${reason}\``)
    
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        try {await user.send({ embeds: [muteserveur] })} catch(err) {}

        await message.reply({ embeds: [muteserveur] })

        await member.timeout(ms(time), reason)

    }
}