const {EmbedBuilder} = require("discord.js");
const Main = require("../index");

module.exports.config = {
    name: "help",
    description: "afficher les caractéristiques du bot",
    pushable: false,
}

module.exports.network = {
    name: "help",
    description: "afficher les caractéristiques du bot",
}

module.exports.execute = async function (member, channel, guild, args, Client, interaction){
    let fields = [];
        Main.commands.forEach(cmd => {
            if(cmd.config.permission === undefined){
                fields.push({name : cmd.config.name, value : cmd.config.description});
            }else{
                if(member.roles.cache.find(r => r.id === cmd.config.permission) !== undefined){
                    fields.push({name : cmd.config.name, value : cmd.config.description});
                }
            }
        })
    const embed = new EmbedBuilder()
        .setColor("#00ffea")
        .setTitle(`**Options de ${member.guild.name}**`)
        .setDescription("Bienvenue sur le menu d'aide de *Achedon12 - Communauté*.")
        .addFields(
           fields
        )
        .setTimestamp()
        .setFooter({
            text: "Achedon12 - Communauté"
        });
    interaction.reply({embeds: [embed]});
}

