const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');

let usupdates = ["http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0013-A0113-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0014-A0114-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0015-A0115-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0016-A0116-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0017-A0117-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0018-A0118-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0019-A0119-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0020-A0120-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0021-A0121-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0022-A0122-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0023-A0123-V0100-PE.pkg", "http://b0.ww.np.dl.playstation.net/tppkg/np/BLUS31181/BLUS31181_T38/a6eff409d3a4c771/UP0002-BLUS31181_00-DESTINYPATCH0024-A0124-V0100-PE.pkg"]
let euupdates = []
let jpupdates = []

module.exports = {
    category: 'Tools',
    description: 'Check for updates',

    slash: false,
    testOnly: false,

    minArgs: 0,
    maxArgs: 50,

    callback: async ({message, interaction, client, args}) => {
        if(!args.length) return message.channel.send(`Need either US, EU, or JP.`);
        let region = args[0].toLowerCase();
        let n = 0;
        if(region === "us"){
            let embed = new MessageEmbed()
                .setColor(color)
                .setTitle(`Destiny [BLUS31181]`)
                .setDescription("12 Packages totaling at 10.66 GB")
                .setFooter({text: "Note that you need to install ALL listed updates, one by one, to play V4nguard."});
            usupdates.forEach(update => {
                n++;
                embed.addField(`Update #${n}`, `[⏬${update.slice(85)}](${update})`);
            })
            message.reply({embeds: [embed]});
            return;
        }
    }
}