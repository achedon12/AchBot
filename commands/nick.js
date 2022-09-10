const {prefix} = require("../config.json");

module.exports.config = {
    name: "nick",
    description: "changer son pseudo",
}
module.exports.execute = async function (member,channel,guild,args,Client,message){
    if(message.member.nickname !== null){
        await member.setNickname(message.author.username);
        message.reply("Vous avez bien réinitialisé votre pseudo");
    }else{
        if(args.length >= 2){
            let msg = "";
            for (let i = 0; i < args.length; i++) {
                msg += " " + args[i];
            }
            await member.setNickname(msg.substring(prefix.length+4));
            message.reply("Vous avez bien changé votre nom en "+msg.substring(prefix.length+4))
        }else{
            message.reply("Veuillez entrer un pseudo valide");
        }
    }
}

