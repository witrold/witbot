const Discord = require('discord.js');
 
module.exports = {
 
    name: "resume",
    description: "⏯️ Reprendre l'écoute d'une musique en pause.",
    permission: "Aucune",
    dm: false,
    category: "Music",
 
    async run(bot, message, args, interaction, guild) {
      try {
      const queue = bot.player.getQueue(message.guild, {metadata: {message: message}})
 
      if (!queue || !queue.playing)
      return message.reply({ephemeral: true, content: "Je ne suis pas en train de jouer de la musique." });
 
      await queue.setPaused(false);
 
      await message.reply(`:play_pause: **__RESUME__ - L'écoute reprend.**`)
 
    }  catch (err) {
      await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
    }
    }
  };