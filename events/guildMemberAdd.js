const Discord = require("discord.js");
const { followerID, activityID, notificationsID} = require("../data/RoleId.json");
const { welcome } = require("../data/ChannelsId.json");
const Main = require("../index");

module.exports.execute = async function (member, any1, any2, Client) {
    let channel = Client.channels.cache.get(Main.channel_id.welcome);

    channel.send(`Bienvenue à <@${member.user.id}> sur ${member.guild.name}`);
    Client.channels.cache.get(Main.channel_id.stats).setName(`📊 | Members: ${member.guild.memberCount}`);
    member.roles.add(followerID);
    member.roles.add(activityID);
    member.roles.add(notificationsID);
}