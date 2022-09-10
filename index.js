const Discord = require("discord.js");
const fs = require('fs');
const {token} = require('./config.json');
const { IntentsBitField } = require("discord.js");

const myIntents = new IntentsBitField();
myIntents.add(
    "GuildMessages",
    "Guilds",
    "GuildMembers",
    "DirectMessages",
    "GuildVoiceStates",
    "GuildPresences",
    "MessageContent"
);

const Client = new Discord.Client({
    intents: myIntents,
    retryLimit: Infinity,
    autoReconnect: true,
    waitGuildTimeout: 0
});

module.exports.dirname = __dirname;

let Collection = new Discord.Collection();
fs.readdir("./commands/",function (error,files){
    files.forEach(file => {
        let command = require("./commands/"+file);
        Collection.set(command.config.name,command);
    });
});

module.exports.commands = Collection;

fs.readdir("./events/", function (err, files) {
    files.forEach(file => {
        Client.on(file.split(".")[0], (args, args2, args3) => {
            require("./events/" + file).execute(args, args2, args3, Client)
        })
    });
});

Client.login(token);