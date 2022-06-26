const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');

let ps3emb = new MessageEmbed()
    .setColor(color)
    .setTitle(`Setup for PlayStation 3`)
    .setDescription(`:x: There is currently no setup for the PlayStation 3 as it is not support with V4nguard.\n\nIf you are interested in setting helping us port this to the PlayStation 3, please contact <@353884565674393602>`)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

module.exports = {
    category: 'Tools',
    description: 'Setup v4nguard for PlayStation 3',

    slash: false,
    testOnly: false,

    callback: ({message, interaction, client, args}) => {
        message.channel.send({
            embeds: [ps3emb]
        })
    }
}