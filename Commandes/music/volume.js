const maxVol = 100;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "volume",
    description: "Permet de stopper la musique dans votre salon vocal.",
    permission: "Aucune",
    dm: false,
    category: "Music",
    options: [
        {
            name: 'volume',
            description: 'the amount volume',
            type: "Number",
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    async run (bot, inter) {
        const queue = bot.player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('volume')

        if (queue.volume === vol) return inter.reply({ content: `The volume you want to change is already the current one ${inter.member}... try again ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `The volume has been modified to **${vol}**/**${maxVol}**% 🔊` : `Something went wrong ${inter.member}... try again ? ❌`});
    },
};