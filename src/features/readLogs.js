const {MessageEmbed} = require('discord.js');
const {color} = require('../config.json');
let {shield, cross, check} = require('../emoji');
const fetch = require('node-fetch');
let checks = require('../modules/checks.json');

module.exports = (client, instance) => {
    let s = client.emojis.cache.get(shield);
    let c = client.emojis.cache.get(cross);
    let ch = client.emojis.cache.get(check);
    client.on('message', async (message) => {
        if (message.author.bot) return;
        const file = message.attachments.first()?.url;
        if(!file) return;
        if(!file.endsWith('.log')) return;
        let msg = await message.reply(`${s} Checking the log file...`);
        try {
            const response = await fetch(file);
            if (!response.ok){
                msg.edit(`${c} The log file could not be read.`);
                return;
            }

            const text = await response.text();

            let lines = text.split('\n');

            if(text) {
                let embed = new MessageEmbed()
                    .setColor(color)
                    .setFooter({text: `Log from ${message.author.username} | ${message.author.id}\n | Discord Attachment`});
                if(!lines[42]){
                    embed.addField(`Build Info`, `${lines[0]} | ${lines[1]} | ${lines[2]}`);
                    embed.addField(`Important Settings to Review`, `ℹ You did not boot up the game. Please boot up the game and resend the log file.`);
                    message.channel.send({embeds: [embed]});
                } else {
                    //let game = lines[42]
                    //let version = lines[66]
                    //let hash = lines[325]
                    //let ppudecode = lines[70]
                    //let spudecode = lines[81]
                    //let spuloop = lines[87]
                    //let threadmode = lines[79]
                    //let spursthreads = lines[88]
                    //let blocksize = lines[89]
                    //let xfloat = lines[101]
                    //let cpublit = lines[157]
                    //let renderer = lines[134]
                    //let res = lines[135]
                    //let resscale = lines[170]
                    //let rsx = lines[163]
                    //let shadermode = lines[139]
                    //let warn;
                    //if(shadermode.includes("Async")){
                    //    shadermode = "Shader Mode: Async"
                    //}
                    //if(threadmode.includes("Operating System")){
                    //    threadmode = "Thread Scheduler Mode: OS"
                    //}
                    //if(rsx.includes("false")){
                    //    rsx = "Multithreaded RSX: []"
                    //}
                    //if(blocksize.includes("Safe")){
                    //    blocksize = "SPU Block Size: Safe"
                    //}
                    //if(renderer.includes("Vulkan")){
                    //    renderer = "Renderer: Vulkan"
                    //}
                    //if(cpublit.includes("false")){
                    //    cpublit = "Force CPU Blit: []"
                    //}
                    //if(xfloat.includes("false")){
                    //    xfloat = "Xfloat: []"
                    //}
                    //if(spuloop.includes("false")){
                    //    spuloop = "SPU Loop: []"
                    //}
                    //if(version !== "01.24"){
                    //    if(warn === undefined){
                    //        warn = `⚠️ You are using an outdated version of the game. Please update to the latest version.`
                    //    } else {
                    //        warn += `\n⚠️ You are using an outdated version of the game. Please update to the latest version.`
                    //    }
                    //}
                    //if(!lines[42].includes("Destiny")){
                    //    if(warn === undefined){
                    //        warn = `:x: This game is not Destiny. Please use the correct game with the log reader.`
                    //    } else {
                    //        warn += `\n:x: This game is not Destiny. Please use the correct game with the log reader.`
                    //    }
                    //}
                    //if(lines[42].includes("(USA)") || lines[42].includes("(EU)") || lines[42].includes("(JP)")){
                    //    if(warn === undefined){
                    //        warn = `🏴‍☠️ **Pirated Content Detected**. You will not recieve support until you legally dump the game. If you need help obtaining valid working dump of the game you own, please read the quickstart guide at https://rpcs3.net/quickstart`
                    //    } else {
                    //        warn += `\n🏴‍☠️ **Pirated Content Detected**. You will not recieve support until you legally dump the game. If you need help obtaining valid working dump of the game you own, please read the quickstart guide at https://rpcs3.net/quickstart`
                    //    }
                    //}
                    //res = res.replace("  Resolution: ", "")
                    //resscale = resscale.replace("  Resolution Scale: ", "")
                    //spursthreads = spursthreads.replace("  Max SPURS Threads: ", "")
                    //spudecode = spudecode.replace("  SPU Decoder: ", "");
                    //ppudecode = ppudecode.replace("  PPU Decoder: ", "")
                    //version = version.replace("·! 0:05:41.733275 SYS: Version: APP_VER=01.00 VERSION=", "");
                    //hash = hash.replace("·W 0:05:41.791896 ppu_loader: PPU executable hash: ", "");
                    // old version, here is new:
                    embed.addField(`Build Info`, `${lines[0]} | ${lines[1]} | ${lines[2]}`);
                    let important;
                    let l2 = checks;
                    lines.forEach(line => {
                        l2.forEach(check => {
                            if(line.includes(check.check)){
                                l2.splice(l2.indexOf(check), 1);
                                if(check.checkrecc === "true"){
                                    if(!line.includes(check.recc)){
                                        let l = line.slice(parseInt(check.splice))
                                        if(important === undefined){
                                            important = `:x: ${check.name} is not correct. Please follow the setup guide to fix this.`
                                        } else {
                                            important += `\n:x: ${check.name} is not correct. Please follow the setup guide to fix this.`
                                        }
                                        let e = new MessageEmbed()
                                            .setColor(color)
                                            .setTitle(`${check.name} - required for use`)
                                            .setDescription(`\`${check.recc}\``)
                                            .setFooter({text: `Log from ${message.author.username} | ${message.author.id}\n | Discord Attachment`});
                                        message.channel.send({embeds: [e]});
                                    } else {
                                        let l = line.slice(parseInt(check.splice))
                                        if(important === undefined){
                                            important = `:white_check_mark: ${check.name} is set to the correct value.`
                                        } else {
                                            important += `\n:white_check_mark: ${check.name} is set to the correct value.`
                                        }
                                    }
                                } else {
                                    let l = line.slice(parseInt(check.splice))
                                    if(important === undefined){
                                        important = `ℹ ${check.name} is set to \`${l}\`.`
                                    } else {
                                        important += `\nℹ ${check.name} is set to \`${l}\`.`
                                    }
                                }
                            }
                        })
                    });
                    if(important){
                        embed.addField(`Important Settings to Review`, important);
                    } else {
                        embed.addField(`Important Settings to Review`, `ℹ You did not boot up the game. Please boot up the game and resend the log file.`);
                    }
                    message.channel.send({embeds: [embed]});
                }
            }
        } catch (e) {
            msg.edit(`${c} The log file could not be read.`);
            console.log(e);
        }
    })
}