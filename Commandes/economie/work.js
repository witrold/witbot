const { time } = require("console");
const Discord = require("discord.js");
const { cp } = require("fs");
const restant = require("ms");

module.exports = {

    name: "work",
    description: "effectuer votre travail de la journée",
    permission: "Aucune",
    dm: true,
    category: "economie",

    async run(bot, message, args) {

        try {

            let db = bot.db;
            
            now = Date.now()
            delai = 7200000
            cooldown = now + delai

            db.query(`SELECT * FROM work WHERE membre = '${message.user.id}'`, async (err, req) => {    
                
                db.query(`INSERT INTO work (time, membre) VALUES (${cooldown},${message.user.id})`, async (err, req) => {
                    
                    db.query(`SELECT time FROM work WHERE membre = '${message.user.id}'`,  async (err, req) => {
                        temps = req[0].time
                        t = temps - now 
                        s = Math.floor(t / 1000) % 60;
                        m = Math.floor(t / 60000) % 60;
                        h = Math.floor(t / 3600000) % 60;
                        
                        if (h > 0) {
                            reste = h+"h "+m+"m "+s+ "s "; 
                        }else if(m > 0){
                            reste = m+"m "+s+ "s "; 
                        }else{
                           reste = s+ "s "; 
                        }

                        if (temps > now) {
                            let embed_argent = new Discord.EmbedBuilder()
                            .setColor(bot.color)
                            .setTitle(`Travaille`)
                            .setDescription(`${message.user.tag} tu doit encore attendre ${reste} avant de pouvoir executer cette commande`)
                            await message.reply({embeds: [embed_argent]})

                        }
                        else{
                            db.query(`UPDATE work SET time = '${cooldown}' WHERE membre = '${message.user.id}'`, async (err, req) => {
                                db.query(`INSERT INTO cooldown (time) VALUES (${cooldown}`, async (err, req) => {
                                    let embed_echec = new Discord.EmbedBuilder()
                                    .setColor(bot.color)
                                    .setTitle(`Création Compte`)
                                    .setDescription(`${message.user.tag} tu ne posséde pas de compte merci d'en créer un avec /create`)

                                    var min=20; 
                                    var max=100;  
                                    var random = Math.floor(Math.random() * (max - min)) + min; 
                                    
                                    db.query(`SELECT * FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {    
                                            
                                        if(req.length > 0) {

                                            db.query(`SELECT argent FROM compte WHERE membre = '${message.user.id}'`, async (err, req) => {
                                                    
                                                compte = req[0].argent

                                                solde = compte + random

                                                db.query(`UPDATE compte SET argent = ${solde} WHERE membre = '${message.user.id}'`)

                                                let embed_argent = new Discord.EmbedBuilder()
                                                .setColor(bot.color)
                                                .setTitle(`Travaille`)
                                                .setDescription(`${message.user.tag} a gagner ${random} € , il posséde maintenant ${solde} €`)
                                                await message.reply({embeds: [embed_argent]})
                                            })
                                        }
                                        else await message.reply({embeds: [embed_echec]})
                                    })
                                })
                            })
                        }
                    })
                })
            })

        } catch (err){
            return console.log(err);
        }
    }
}
