const fileName = __dirname+"\\..\\data\\Xp.json";
const file = require(__dirname+"\\..\\data\\Xp.json");
const fs = require("fs");

module.exports.createProfile = (userId) => {
    const all = require(fileName);
    all[userId] = {
        xp: 0,
        level: 0,
        lastUpdated: Date.now()
    };
    fs.writeFile(fileName, JSON.stringify(all,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.hasAccount = (userId) =>{
    return (JSON.parse(fs.readFileSync(fileName).toString('utf-8'))[userId] !== undefined);
}

module.exports.addXp = (userId, amount) =>{
    const all = require(fileName);
    all[userId] = {
        xp: this.getXp(userId) + amount,
        level: this.getLevel(userId),
        lastUpdated: Date.now()
    };
    fs.writeFile(fileName, JSON.stringify(all,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.addLevel = (userId, amount ) => {
    const all = require(fileName);
    all[userId] = {
        xp: this.getXp(userId),
        level: this.getLevel(userId) + amount,
        lastUpdated: Date.now()
    };
    fs.writeFile(fileName, JSON.stringify(all,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.removeLevel = (userId, amount = 1) =>{
    const all = require(fileName);
    all[userId] = {
        xp: this.getXp(),
        level: this.getLevel(userId) - amount,
        lastUpdated: Date.now()
    };
    fs.writeFile(fileName, JSON.stringify(all,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.removeXp = (userId, amount) =>{
    const all = require(fileName);
    all[userId] = {
        xp: this.getXp(userId) - amount,
        level: this.getLevel(userId),
        lastUpdated: 0
    };
    fs.writeFile(fileName, JSON.stringify(all,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.getXp = (userId) => {
    return require(fileName)[userId].xp;
}

module.exports.getLevel = (userId) => {
    return require(fileName)[userId].level;
}

module.exports.getLastUpdated = (userId) => {
    return require(fileName)[userId].lastUpdated;
}

module.exports.getXpRequierd = (level) => {
    let result = 100;
    if(level === 0) return result;
    for (let i = 0;i < level; i++){
        result = Math.round(result*1.15);
    }
    return result
}
