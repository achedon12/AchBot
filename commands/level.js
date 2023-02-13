const {getLevel, hasAccount, getXp} = require("../managers/XpManager")

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
        if(!hasAccount(member.id)){
            return interaction.reply("Vous n'avez pas encore d'xp");
        }
        return interaction.reply(`Vous êtes niveau ${getLevel(member.id)} avec ${getXp(member.id)} xp`)
    }else{
        if(!hasAccount(args[0])){
            return interaction.reply("Cette personne ne possède pas d'xp");
        }

        const theMember = await Client.users.fetch(args[0]);

        return interaction.reply(`${theMember.username} est niveau ${getLevel(args[0])} avec ${getXp(args[0])} xp`)
    }
}