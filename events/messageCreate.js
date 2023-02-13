const { compter, commandBot } = require("../data/ChannelsId.json");
const { serveurBooster, abonnes, actif6, adminID } = require("../data/RoleId.json");

const {getScore, resetScore, updateScore, getRecord, getPseudo, updateRecord} = require("../managers/CompterManager");
const {EmbedBuilder, BaseChannel, DMChannel} = require("discord.js");
const {hasAccount, createProfile, addXp, getLastUpdated, getXpRequierd, getLevel, getXp, removeXp, addLevel} = require("../managers/XpManager");


module.exports.execute = async function (message,args2,args3,Client){
    if(message.author.bot) return;
    if(message.channel instanceof DMChannel) return;

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

    if(message.channel.id === compter){
        if(parseInt(message.content) !== getScore() + 1){
            updateRecord();
            resetScore();

            const embed = new EmbedBuilder()
                .setTitle(`${message.member.user.tag} s'est trompé`)
                .setDescription(`Le jeu recommence !\n Le record est actuellement ${getRecord()}, detenu par <@${getPseudo()}>\nLe prochain nombre est: **1**`)
                .setTimestamp()
            await message.channel.send({embeds: [embed]});
        }else{
            updateScore(userId);
        }
    }else{
        let helloClient = ["slt","salut","hello","yo","yoo","bonjour","bjr","hi","yosh"]

        if(helloClient.includes(message.content)){
            message.react("👋");
        }
    }
}