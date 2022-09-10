const { prefix } = require("../config.json");
const { compter, commandBot } = require("../data/ChannelsId.json");
const { serveurBooster, abonnes, actif6, adminID } = require("../data/RoleId.json");

const {commands} = require("../index");
const {getScore, resetScore, updateScore, getRecord, getPseudo, setRecord, setPseudo, updateRecord} = require("../managers/CompterManager");
const {EmbedBuilder, BaseChannel} = require("discord.js");
const {hasAccount, createProfile, addXp, getLastUpdated, getXpRequierd, getLevel, getXp, removeXp, addLevel} = require("../managers/XpManager");


module.exports.execute = async function (message,args2,args3,Client){
    if(message.author.bot || message.channel instanceof BaseChannel) return;

    /* Xp for message */

    const userId = message.member.id;
    if(!hasAccount(message.member.id)){
        createProfile(userId);
    }
    const roleCache = message.member.roles.cache;
    let xpAmount;

    if(roleCache.has(adminID) || roleCache.has(abonnes)){
        xpAmount = 15;
    }else if(roleCache.has(serveurBooster) || roleCache.has(actif6)){
        xpAmount = 10;
    }else{
        xpAmount = 5;
    }

    if((Date.now() - getLastUpdated(userId)) >= 30000){
        addXp(userId,xpAmount);
        if(getXp(userId) >= getXpRequierd(getLevel(userId))){
            addLevel(userId,1);
            removeXp(userId,getXpRequierd(getLevel(userId) - 1));
            await message.guild.channels.cache.get(commandBot).send(`<@${userId}>, vous venez de passer au niveau ${getLevel(userId)} !`);
        }
    }

    /* Message when it's not a command */
    if(!message.content.startsWith(prefix)){
        if(message.channel.id === compter){
            console.log(message.content);
            if(parseInt(message.content) !== getScore() + 1){
                updateRecord();
                resetScore();
                setPseudo(userId);
                const embed = new EmbedBuilder()
                    .setTitle(`${message.member.user.tag} s'est trompé`)
                    .setDescription(`Le jeu recommence !\n Le record est actuellement ${getRecord()}, detenu par <@${getPseudo()}>\nLe prochain nombre est: **1**`)
                    .setTimestamp()
                message.channel.send({embeds: [embed]});
            }else{
                updateScore();
            }
        }else{
            let helloClient = ["slt","salut","hello","yo","yoo","bonjour","bjr","hi","yosh"]
            let helloBot = ["salut *"+message.author.username+"* !", "bonjour *"+message.author.username+"* !","hello *"+message.author.username+"* !"];

            if(helloClient.includes(message.content)){
                message.reply(helloBot[Math.floor(Math.random() * helloBot.length)]);
            }
        }
    }else{
        let args = message.content.substring(prefix.length).split(" ");

        const cmd = commands.get(args[0]);

        if(cmd !== undefined){
            if(cmd.config.permission !== undefined){
                if(message.member.roles.cache.find(r => r.id === cmd.config.permission) !== undefined){
                    cmd.execute(message.member,message.channel,message.guild,args,Client,message);
                }else{
                    message.reply("Vous n'avez pas la permission d'utiliser cette commande");
                }
            }else{
                cmd.execute(message.member,message.channel,message.guild,args,Client,message);
            }
        }
    }
}