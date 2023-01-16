const Discord = require('discord.js');

module.exports = {
    name: "stop",
    description: "Permet de stopper la musique dans votre salon vocal.",
    permission: "Aucune",
    dm: false,
    category: "Music",

    async run (bot, message, args) {
        try {

            // Vérifie si l'utilisateur qui a envoyé le message se trouve dans un salon vocal
            if(!message.member.voice.channel) return message.reply("Vous n'êtes pas dans un salon vocal.");

            // Récupère la file d'attente de musique du salon vocal de l'utilisateur
            const queue = bot.player.getQueue(message.guild);
            if (!queue) return message.reply("Il n'y a pas de musique en cours de lecture.");

            // Stoppe la musique et vide la file d'attente
            await queue.stop();
            await message.reply(`La musique \`${track.title}\` a été arrêtée.`);

        } catch (err) {
            await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." });
        }
    }
}   
