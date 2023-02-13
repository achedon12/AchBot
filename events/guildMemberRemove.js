const Discord = require("discord.js");
const { welcome } = require("../data/ChannelsId.json");
const Main = require("../index");

module.exports.execute = async function (member, any1, any2, Client) {

    let channel = Client.channels.cache.get(Main.channel_id.welcome);
    channel.send(`Au revoir à <@${member.user.id}>, en espérant te revoir bientôt`);
    Client.channels.cache.get(Main.channel_id.stats).setName(`📊 | Members: ${member.guild.memberCount}`);
}