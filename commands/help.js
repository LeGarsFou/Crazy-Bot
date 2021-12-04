const Discord = require('discord.js'),
    config = require('../config.json')

module.exports = {
    run: (message, args, client) => {


        const funTable = [],
            utilitaireTable = [],
            musiqueTable = [],
            ticketTable = [],
            moderatorTable = [],
            autreTable = [];



        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.help) return message.channel.send(new Discord.MessageEmbed()
                .setDescription('Cette commande n\'existe pas.')
                .setColor('#ff0000')
                .setThumbnail('https://cdn.discordapp.com/attachments/738864387019767921/821457688172167198/Hnet.com-image.gif'))
            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Commande : ${command.name}`)
                .setDescription(`__Catégorie :__ ${command.help.category}\n\n${command.help.description}\n\n__Syntaxe :__ \`${config.prefix}${command.name}${command.help.syntax ? ` ${command.help.syntax}` : ''}\``)
                .setTimestamp())
        }
        else {

            message.channel.send("Chargement en cours...").then((msg) => {
                client.commands.forEach(command => {


                    switch (command.help.category) {
                        case "Fun":
                            funTable.push(command);
                            break;

                        case "Utilitaire":
                            utilitaireTable.push(command);
                            break;

                        case "Musique":
                            musiqueTable.push(command);
                            break;

                        case "Ticket":
                            ticketTable.push(command);
                            break;

                        case "Modération":
                            moderatorTable.push(command);
                            break;

                        case "Autre":
                            autreTable.push(command);
                            break;
                    };
                });

                message.channel.send(new Discord.MessageEmbed()
                    .setTitle('Liste des commandes')
                    .setDescription(`➡️ **__FUN__ :**\n
                    ${funTable.map(command => `\`${config.prefix}${command.name}\``).join(", ")}
                    \n\n ➡️** __UTILITAIRE__ :**\n
                    ${utilitaireTable.map(command => `\`${config.prefix}${command.name}\``).join(", ")}
                    \n\n ➡️** __MUSIQUE__ :**\n
                    ${musiqueTable.map(command => `\`${config.prefix}${command.name}\``).join(", ")}
                    \n\n ➡️** __TICKET__ :**\n
                    ${ticketTable.map(command => `\`${config.prefix}${command.name}\``).join(", ")}
                    \n\n ➡️** __MODÉRATION__ :**\n
                    ${moderatorTable.map(command => `\`${config.prefix}${command.name}\``).join(", ")}
                    \n\n ➡️** __AUTRE__ :**\n
                    ${autreTable.map(command => `\`${config.prefix}${command.name}\``).join(", ")} `)
                    .setFooter('Pour + d\'infos sur une commande, faites c.help <commande>')
                    .setTimestamp()).then(() => { msg.delete() });
            });
        };
    },
    name: 'help',
    help: {
        description: 'Cette commande permet d\'afficher les différentes commandes disponibles. Pas de permisson(s) requise(s).',
        category: "Utilitaire",
        syntax: '[nom de la commande]'
    },
}