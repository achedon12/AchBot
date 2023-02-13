const Discord = require("discord.js");
const fs = require('fs');
const {token} = require('./config.json');
const { IntentsBitField } = require("discord.js");
const buttonFactory = require("./managers/buttonFactory");

const myIntents = new IntentsBitField();
myIntents.add(
    "GuildMessages",
    "Guilds",
    "GuildMembers",
    "DirectMessages",
    "GuildVoiceStates",
    "GuildPresences",
    "MessageContent",
);

const Client = new Discord.Client({
    intents: myIntents,
    retryLimit: Infinity,
    autoReconnect: true,
})

let Collection = new Discord.Collection();
fs.readdir("./commands/", function (error, files) {
    files.forEach(file => {
        let command = require("./commands/" + file);
        Collection.set(command.config.name, command);
    });
});

fs.readdir("./events/", function (err, files) {
    files.forEach(file => {
        Client.on(file.split(".")[0], (args, args2, args3) => {
            require("./events/" + file).execute(args, args2, args3, Client)
        })
    });
});

module.exports.saveData = function(file, data){
    fs.writeFile(file,data,"utf8", function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
        }
    })
}

module.exports.dirname = __dirname;
module.exports.role_id = require("./data/RoleId.json");
module.exports.channel_id = require("./data/ChannelsId.json");
module.exports.Client = Client;
module.exports.commands = Collection;

buttonFactory.initialise(Client);

Client.login(token);