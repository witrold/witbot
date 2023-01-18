const Discord = require('discord.js');
const giphy = require('giphy-api')('58ASb4ym6vdLn6yDYpLwT7etfHxnSJRP');
const { EmbedBuilder } = require("discord.js")
 
module.exports = {
  name: "react",
  description: "Envoie un gif d'anime correspondant à une action",
  permission: "Aucune",
  dm: true,
  category: "fun",
  options: [
    {
    type: "user",
    name: "membre",
    description: "Le membre choisis",
    required: true,
    autocomplete: false
    },
    {
      type: "string",
      name: "action",
      description: "L'action choisie",
      required: true,
      autocomplete: false,
    },
  ],
  async run(bot, message, args) {
    let user = args.getUser("membre")
    let action = args.get("action").value;
 
    const allowedActions = ["hug", "kiss", "cuddle", "feed", "pat", "poke", "slap", "smug", "tickle", "wink", "kill", "suck"];
 
    // Vérifiez si l'action demandée est dans la liste des actions autorisées
    if (!allowedActions.includes(action)) {
      return message.reply("Cette action n'est pas disponible. Veuillez choisir une action parmi les suivantes : " + allowedActions.join(", "));
    }
 
    // Recherchez le gif correspondant à l'action autorisée
    giphy.search(`${action}`, (error, result) => {
      if (error) {
        console.error(error);
        return message.reply("Une erreur s'est produite lors de la récupération du gif.");
      }
 
      const gifs = result.data;
      if (!gifs.length) {
        return message.reply("Aucun gif trouvé pour cette action.");
      }
 
      // Sélectionnez un gif au hasard dans le tableau
      const index = Math.floor(Math.random() * gifs.length);
      const gif = gifs[index];
 
      // Envoi du gif dans le canal de discussion
      const Reactembed = new EmbedBuilder()
        .setDescription(`**${message.user.username}** fait l'action \`${action}\` envers **${user.username}**`)
        .setImage(gif.images.fixed_height.url)
        .setColor(bot.color)
        .setFooter({ text: `${action}`})
        .setTimestamp();
        message.reply({embeds: [Reactembed]})
    });
  },
};