module.exports.Voice = {};
let emoji = [
    "⚡",
    "🌍 ",
    "🌵",
    "🔥",
    "🥂",
    "🌈",
    "🌟",
    "🌙",
    "🌹",
    "🌺",
    "🌻",
    "🌼",
    "🌽",
    "🌾",
]
module.exports.execute = async function (oldState, newState) {
    const index = require("../index")
    if (newState.channelId === "965495953689817118") {
        newState.guild.channels.create({
            name: newState.member.displayName+ emoji[Math.floor(Math.random()* emoji.length)],
            type: 2,
            parent: "965474854088343585",
            bitrate: 96000
        }).then(channel => {
            this.Voice[channel.id] = channel.id;
            index.saveData("./voice.json",JSON.stringify(this.Voice))
            newState.member.voice.setChannel(channel);
        })

    } else if (newState.channelId === null || newState.channelId !== oldState.channelId) {
        if (oldState.channel !== null && oldState.channel.members.size === 0 && this.Voice[oldState.channel.id] !== undefined) {
            try {
                oldState.channel.delete();
            }catch (e) {

            }
            delete this.Voice[oldState.channel.id];
            index.saveData("./voice.json",JSON.stringify(this.Voice))
        }
    }
}