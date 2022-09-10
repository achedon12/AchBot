module.exports.config = {
    name: "ping",
    description: "Savoir son ping",
}
module.exports.execute = async function (member,channel,guild,args,Client,message){
    setTimeout(()=>{message.delete()},500);
    channel.send("Votre ping est de "+Client.ws.ping+" ms");
}