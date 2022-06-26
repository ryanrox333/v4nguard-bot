const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { color } = require('../config.json');
const { getRandomMeme, getLocalRandomMeme } = require('@blad3mak3r/reddit-memes');



module.exports = {
    category: 'Fun',
    description: 'Meme generator',
    slash: false,
    testOnly: false,
    callback: async ({message, interaction, client, args}) => {
        let meme;
        getRandomMeme("meme", { allowNSFW: false }).then((m) => {
            meme = m;
            let memeEmbed = new MessageEmbed()
            .setColor(color)
            .setImage(meme.image)
            .setFooter({text: `👍 ${meme.ups} | 💬 ${meme.comments}`});
            message.channel.send({
                embeds: [memeEmbed]
            });
        }).catch(console.error);
    }
};