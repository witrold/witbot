const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {
    name: "invite",
    description: "Pour inviter le bot",
    permission: "Aucune",
    dm: false,
    category: "Information",
    
    async run(bot, message) {
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel("M'inviter")
					.setStyle(ButtonStyle.Link)
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1018550449823039610&permissions=8&scope=bot%20applications.commands"), 
			);
        
        const embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Inviter le bot :`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription("Cliquer sur le bouton pour m'inviter")
            .setTimestamp()
            .setFooter({text: "Inviter le bot"})

        await message.reply({embeds: [embed], components: [row] });
        
    }
}