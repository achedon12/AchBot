const {moderatorID} = require("../data/RoleId.json");

module.exports.config = {
    name: "say",
    description: "faire un message d'annonce",
    permission : moderatorID,
    pushable: false,
}

module.exports.network = {
    name: "say",
    description: "faire un message d'annonce",
    options: [
        {
            name: "annonce",
            description: "message d'annonce",
            type: "STRING",
            required: true
        }
    ]
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction){
    interaction.reply(args[0]);
}