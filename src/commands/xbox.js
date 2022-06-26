const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');

let xboxemb = new MessageEmbed()
    .setColor(color)
    .setTitle(`Setup for Xbox 360/One`)
    .setDescription(":x: There is currently no setup for the Xbox 360/One as it is not support with V4nguard.\n\nIf you are interested in setting helping us port this to the Xbox 360/One, please contact <@353884565674393602>.")
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

module.exports = {
    category: 'Tools',
    description: 'Setup v4nguard for Xbox 360/One',

    slash: false,
    testOnly: false,

    callback: ({message, interaction, client, args}) => {
        message.channel.send({
            embeds: [xboxemb]
        })
    }
}