const {EmbedBuilder, DMChannel} = require("discord.js");
const {role_id, channel_id, XpManager, CompterManager} = require("../index");


module.exports.execute = async function (message,args2,args3,Client){
    if(message.author.bot) return;
    if(message.channel instanceof DMChannel) return;

    let helloClient = ["slt","salut","hello","yo","yoo","bonjour","bjr","hi","yosh"]

    if(helloClient.includes(message.content)){
        message.react("👋");
    }
}