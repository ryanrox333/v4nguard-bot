const { MessageEmbed } = require("discord.js");
const { color } = require("../config.json");
const coolpics = require("cool-pics");

module.exports = {
    category: 'Fun',
    description: 'Kiss someone',
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
        let kiss = coolpics.kiss();
        let kissEmbed = new MessageEmbed()
        .setColor(color)
        .setImage(kiss)
        .setTimestamp()
        .setFooter({text: `${message.author.tag} kissed ${user.tag}`});
        message.channel.send({
            embeds: [kissEmbed]
        });

    }
};