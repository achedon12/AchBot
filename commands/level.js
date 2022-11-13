const {getLevel, hasAccount} = require("../managers/XpManager")

module.exports.config = {
    name: "level",
    description: "connaître son level",
    pushable: false,
}

module.exports.network = {
    name: "level",
    description: "connaître son level",
    options: [
        {
            name: "id",
            description: "id de la personne",
            type: "USER",
            required: false
        }
    ]
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction){
    if(args[0] === undefined){
        return interaction.reply(`Vous êtes niveau ${getLevel(member.id)}`)
    }else{
        if(!hasAccount(args[0])){
            return interaction.reply("Cette personne n'existe pas ou n'est pas dans la database");
        }
        const theMember = guild.members.cache.get(args[0].toString());
        return interaction.reply(`${theMember.name} est niveau ${getLevel(args[0])}`)
    }
}