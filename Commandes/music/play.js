const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "play",
    description: "Joue de la musique dans votre salon vocal.",
    permission: "Aucune",
    dm: false,
    category: "Music",
    options: [
        {
        type: "string",
        name: "musique",
        description: "Nom/URL de la musique",
        required: true,
        autocomplete: false
        }
    ],

    async run (bot, message, args) {
        
        try {
        let musique = args.getString("musique");
        if(!message.member.voice.channel) return message.reply({ephemeral: true, content: "Vous n'êtes pas dans un salon vocal."})

        const queue = bot.player.createQueue(message.guild, {metadata: {message: message}});

        let track = await bot.player.search(musique, {requestedBy: message.user}).then(track => track.tracks[0]);
        if (!track) return message.reply("Il n'y a pas de musique avec ce nom.");

        if (!queue.connection) await queue.connect(message.member.voice.channel);
        await queue.play(track);
        const play = new EmbedBuilder()
            .setColor(bot.color)
            .setDescription(
                `La musique \`${track.title}\` a été ajoutée à la queue. 
                Auteur: \`${track.author}\`
                Durée: \`${track.duration}\``)
                await message.reply({ embeds: [play]})

        }  catch (err) {
        await message.reply({ ephemeral: true, content: "Une erreur inconnue s'est produite." })
        }
    }
}