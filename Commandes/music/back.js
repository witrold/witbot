const Discord = require('discord.js');
 
module.exports = {
 
    name: "back",
    description: "⏪ Écouter la musique précédente.",
    permission: "Aucune",
    dm: false,
    category: "Music",
 
    async run(bot, message, args, interaction, guild) {
      try {
      const queue = bot.player.getQueue(message.guild, {metadata: {message: message}})
 
      if (!queue || !queue.playing)
      return message.reply({ephemeral: true, content: "Je ne suis pas en train de jouer de la musique." });
 
      await queue.back();
 
      await message.reply(`:rewind: **__BACK__ - Écoute de la musique précédente.**`)
 
    }  catch (err) {
      await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };  