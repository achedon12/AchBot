const Discord = require("discord.js");
const { followerID, activityID, notificationsID} = require("../data/RoleId.json");
const { welcome } = require("../data/ChannelsId.json");

module.exports.execute = async function (member, any1, any2, Client) {
    Client.channels.cache.get(welcome).send(`Bienvenue à <@${member.user.id} sur ${member.guild.name}>`);
    member.roles.add(followerID);
    member.roles.add(activityID);
    member.roles.add(notificationsID);
}