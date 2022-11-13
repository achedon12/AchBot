const { EmbedBuilder} = require("discord.js");
const {moderatorID} = require("../data/RoleId.json");

module.exports.config = {
    name: "userinfo",
    description: "informations par rapport à un utilisateur",
    permission: moderatorID,
    pushable: false,
}

module.exports.network = {
    name: "userinfo",
    description: "informations par rapport à un utilisateur",
    options: [
        {
            name: "id",
            description: "id de la personne",
            type: "USER",
            required: true
        }
    ]
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction){

    const int = args[0];
    if(!int || isNaN(args[0])){
        return interaction.reply("Veuillez un nombre valide");
    }

    const user =  int;

    const theMember = guild.members.cache.get(user.id);
    const embed = new EmbedBuilder()
        .setColor("#00ffea")
        .setAuthor({name: `Informations sur ${theMember.username}`})
        .addFields(
        [
                {name :"Tag: ", value: `*${user.tag}*`},
                {name: "Est un bot: ", value: `*${user.bot}*`},
                {name: "Nickname: ",value: `*${theMember.nickname}*` ?? "None"},
                {name: "A rejoint le serveur: ",value: `*${new Date(theMember.joinedTimestamp).toLocaleDateString()}*`},
                {name: "Création du compte ",value: `*${new Date(user.createdAt).toLocaleDateString()}*`},
                {name: "Nombre de rôles: ",value: `*${theMember.roles.cache.size - 1}*`}]
        )
    interaction.reply({embeds: [embed]});
}