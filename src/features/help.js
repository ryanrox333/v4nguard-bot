module.exports = (client, instance) => {
    client.on('message', async (message) => {
        let rsxreg = new RegExp('"^[`""]?(·|(\w|!)) ({(rsx|PPU|SPU)|LDR:)|E LDR:')
        if (message.author.bot) return;
        let rsxfinal = rsxreg.test(message.content);
        if(rsxfinal){
            if(message.content.includes("fs::file is null")){
                return message.reply("This error usually indicates a missing `.rap` license file. Please follow the instructions in the `d!pc` command to obtain a license file.");
            }
            if(message.content.includes("Invalid or unsupported file format")){
                return message.reply("This error usually indicates an encrypted or corrupted game dump. Please follow the instructions in the `d!pc` command to obtain a license file.")
            }
        }
    })
}