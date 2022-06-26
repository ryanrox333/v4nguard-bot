let {MessageEmbed} = require('discord.js');
let {color} = require('../config.json');
let coolpics = require("cool-pics");

module.exports = {
    category: 'Fun',
    description: 'Hug someone',
    slash: false,
    testOnly: false,
    callback: ({message, interaction, client, args}) => {
        if(!args.length) {
            message.channel.send(`${message.author}, you need to specify a user.`);
            return;
        }
        let user = message.mentions.users.first();
        if(!user) {
            message.channel.send(`${message.author}, I couldn't find that user.`);
            return;
        }
        let hug = coolpics.hug();
        let hugEmbed = new MessageEmbed()
        .setColor(color)
        .setImage(hug)
        .setTimestamp()
        .setFooter({text: `${message.author.tag} hugged ${user.tag}`});
        message.channel.send({
            embeds: [hugEmbed]
        });
    }
};