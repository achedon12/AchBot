const { EmbedBuilder} = require("discord.js");
const {moderatorID} = require("../data/RoleId.json");

module.exports.config = {
    name: "userinfo",
    description: "informations par rapport à un utilisateur",
    permission: moderatorID
}
module.exports.execute = async function (member,channel,guild,args,Client,message){
    if(args.length >= 2){
        const user = message.mentions.users.first() ?? message.member.user;

        if(user === undefined){
            message.reply("Veuillez entrer une id");
            return;
        }

        const member = guild.members.cache.get(user.id);
        const embed = new EmbedBuilder()
            .setColor("#00ffea")
            .setAuthor({name: `Informations sur ${user.username}`})
            .addFields(
            [
                    {name :"Tag: ", value: `*${user.tag}*`},
                    {name: "Est un bot: ", value: `*${user.bot}*`},
                    {name: "Nickname: ",value: `*${member.nickname}*` ?? "None"},
                    {name: "A rejoint le serveur: ",value: `*${new Date(member.joinedTimestamp).toLocaleDateString()}*`},
                    {name: "Création du compte ",value: `*${new Date(user.createdAt).toLocaleDateString()}*`},
                    {name: "Nombre de rôles: ",value: `*${member.roles.cache.size - 1}*`}]
            )
        channel.send({embeds: [embed]});
    }else{
        message.reply("Veuillez entrer un id");
    }
}