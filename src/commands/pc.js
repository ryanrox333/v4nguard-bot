const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');

let pcemb = new MessageEmbed()
    .setColor(color)
    .setTitle(`Setup for PC`)
    .setDescription("What you'll need:\n- RPCS3 (https://rpcs3.net/quickstart)\n- Copy of Destiny 1 (that has been legally dumped/obtained)\n\n\n1. Open up RPCS3 and click `File->Add Games` and search for where the folder is for your Destiny Copy.\n\n2. Go to `Manage->Game Patches` and click `Only Show owned games`, if done correctly, Destiny should appear with a patch named `Custom Servers`, click the box and enable it.\n\n3. Right-Click Destiny in the game menu and click `Create Custom Configuration` and match your configuration with the wiki here: https://wiki.rpcs3.net/index.php?title=Destiny\n\n4.Head to network and `IP/Host Switches` and add the following to your list: \n`www1.signon.deadorbit.net=34.68.134.90&&www1.signon.gravityshavings.net=34.68.134.90&&www2.signon.deadorbit.net=34.68.134.90&&www2.signon.gravityshavings.net=34.68.134.90&&www3.signon.deadorbit.net=34.68.134.90&&www3.signon.gravityshavings.net=34.68.134.90&&www4.signon.deadorbit.net=34.68.134.90&&www4.signon.gravityshavings.net=34.68.134.90&&www5.signon.deadorbit.net=34.68.134.90&&www5.signon.gravityshavings.net=34.68.134.90&&www6.signon.deadorbit.net=34.68.134.90&&www6.signon.gravityshavings.net=34.68.134.90&&www7.signon.deadorbit.net=34.68.134.90&&www7.signon.gravityshavings.net=34.68.134.90&&www8.signon.deadorbit.net=34.68.134.90&&www8.signon.gravityshavings.net=34.68.134.90&&panther-ps3-auth3.prod.demonware.net=34.68.134.90&&panther-ps3-lobby.prod.demonware.net=34.68.134.90`\n\n5. While in the Network tab, click the box under `PSN Status` and set it to `RPCN`. Head to `Configuration->RPCN` and create an account if you haven't.\n\nYou should now be able to run destiny on your PC.\n\n\n:warning: **Copies downloaded from the internet violates the no piracy rule. We do not support piracy and they do not always work. YOU WILL RECEIVE NO HELP IF FOUND TO BE USING A PIRATED COPY.**")
    .setTimestamp()
    .setFooter({text: `V4nguard Bot by iq#2360`});

module.exports = {
    category: 'Tools',
    description: 'Setup v4nguard for PC',

    slash: false,
    testOnly: false,

    callback: ({message, interaction, client, args}) => {
        message.channel.send({
            embeds: [pcemb]
        })
    }
}