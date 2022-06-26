let {MessageEmbed} = require('discord.js');
let {color} = require('../config.json');

module.exports = {
    category: 'Fun',
    description: 'Get a user\'s avatar',
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

        let useremb = new MessageEmbed()
            .setColor(color)
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.avatarURL({format: 'png', dynamic: true}) || user.avatarURL)
            .setTimestamp()
            .setFooter({text: `V4nguard Bot by iq#2360`});

        message.channel.send({
            embeds: [useremb]
        })
        
    }
};