const Discord = require('discord.js')
const { cp, truncateSync } = require('fs')
const { EmbedBuilder } = require('discord.js')


module.exports = {
    
    name: "unban",
    description: "unban un membre",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "le membre a unban",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "la raison du unban",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

    
            
        let user = args.getUser("utilisateur")
        if(!user) return message.reply("Pas d'utilisateur !")

        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournit";

        if(!(await message.guild.bans.fetch()).get(user.id)) return message.reply("Cet utilisateur n'est pas bannie")

        //////////////////////////////////////////// Mise en place des embed /////////////////////////////////////////////////////////// 

        const unbanserver = new EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`${message.user} a unban ${user.tag} pour la raison : \`${reason}\``)

        const unbanpriver = new EmbedBuilder()
        .setColor(bot.color)
        .setDescription(`Tu as été unban du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        try {await user.send({ embeds: [unbanpriver] })} catch(err) {}
            
        await message.reply({ embeds: [unbanserver] })

        await message.guild.members.unban(user, reason)
        
    }
}