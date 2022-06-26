const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');

let nohemb = new MessageEmbed()
    .setColor(color)
    .setTitle('V4nguard Help')
    .setDescription('Use `d!help <category>` to get help on a specific category.')
    .addField(`Tools`, '`d!help tools`', true)
    .addField(`Fun`, '`d!help fun`', true)
    .addField(`Moderation`, '`d!help moderation`', true)
    .addField(`LFG`, '`d!help LFG`', true)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

let toolsemb = new MessageEmbed()
    .setColor(color)
    .setTitle('V4nguard Help - Tools')
    .addField(`d!stats <username>`, `Get your current Destiny stats.`)
    .addField(`d!trials <username>`, `Get your current Trials stats.`)
    .addField(`d!xur`, `What is xur selling?`)
    .addField(`d!pc`, `Learn to setup V4nguard for PC`)
    .addField(`d!ps3`, `Learn to setup V4nguard for PS3 - :x:`)
    .addField(`d!ps4`, `Learn to setup V4nguard for PS4 - :x:`)
    .addField(`d!xbox`, `Learn to setup V4nguard for Xbox - :x:`)
    .addField(`d!status`, `Get the current status of V4nguard.`)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

let funemb = new MessageEmbed()
    .setColor(color)
    .setTitle('V4nguard Help - Fun')
    .addField(`d!8ball <question>`, `Ask the bot a question.`)
    .addField(`d!avatar <user>`, `Get the avatar of a user.`)
    .addField(`d!kiss <user>`, `Kiss a user.`)
    .addField(`d!hug <user>`, `Hug a user.`)
    .addField(`d!meme`, `Free memes`)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

let modemb = new MessageEmbed()
    .setColor(color)
    .setTitle('V4nguard Help - Moderation')
    .setDescription(`These are for moderation inside the discord, use the administration panel to ban/kick/mute/unmute users in the game.`)
    .addField(`d!ban <user>`, `Ban a user.`)
    .addField(`d!kick <user>`, `Kick a user.`)
    .addField(`d!mute <user>`, `Mute a user.`)
    .addField(`d!unmute <user>`, `Unmute a user.`)
    .addField(`d!warn <user>`, `Warn a user.`)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

let lfgemb = new MessageEmbed()
    .setColor(color)
    .setTitle('V4nguard Help - LFG')
    .addField(`d!lfg`, `Get a list of all the current LFGs.`)
    .addField(`d!request <type>`, `Create a LFG request for a type.`)
    .addField(`d!cancel <type>`, `Cancel a LFG request for a type.`)
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

module.exports = {
    category: 'Main',
    description: 'Help menu for the bot',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 1,

    callback: ({message, interaction, client, args}) => {
        nohemb.setThumbnail(client.user.avatarURL({format: 'png', dynamic: true}) || client.user.avatarURL);
        if(args[0] === "tools"){
            message.channel.send({
                embeds: [toolsemb]
            })
        } else if(args[0] === "fun"){
            message.channel.send({
                embeds: [funemb]
            })
        } else if(args[0] === "moderation"){
            message.channel.send({
                embeds: [modemb]
            })
        } else if(args[0] === "LFG"){
            message.channel.send({
                embeds: [lfgemb]
            })
        } else {
            message.channel.send({
                embeds: [nohemb]
            })
        }
    }
}