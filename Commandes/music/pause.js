const Discord = require('discord.js');
 
module.exports = {
 
    name: "pause",
    description: "⏸️ Mettre en pause la musique.",
    permission: "Aucune",
    dm: false,
    category: "Music",
 
    async run(bot, message, args, interaction, guild) {
      try {
      const queue = bot.player.getQueue(message.guild, {metadata: {message: message}})
 
      if (!queue || !queue.playing)
      return message.reply({ephemeral: true, content: "Je ne suis pas en train de jouer de la musique." });
 
      await queue.setPaused(true);
 
      await message.reply(`:pause_button: **__PAUSE__ - L'écoute est interrompu.**`)
 
    }  catch (err) {
      await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };