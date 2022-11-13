const {prefix} = require("../config.json");

module.exports.config = {
    name: "nick",
    description: "changer son pseudo",
    pushable: false,
}

module.exports.network = {
    name: "nick",
    description: "changer son pseudo",
    options: [
        {
            name: "nickname",
            description: "nouveau pseudo",
            type: "STRING",
            required: false
        }
    ]
}

module.exports.execute = async function (member,channel,guild,args,Client,message,interaction){
    if(message.member.nickname !== null){
        await member.setNickname(message.author.username);
        message.reply("Vous avez bien réinitialisé votre pseudo");
    }else{
        await member.setNickname(args[0]);
        message.reply("Vous avez bien changé votre nom en "+args[0])

    }
}

