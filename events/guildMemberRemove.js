const Discord = require("discord.js");
const { welcome } = require("../data/ChannelsId.json");

module.exports.execute = async function (member, any1, any2, Client) {
    Client.channels.cache.get(welcome).send(`Au revoir à <@${member.user.id}, en espérant te revoir bientôt`);
    member.roles.add(followerID);
    member.roles.add(activityID);
    member.roles.add(notificationsID);
}