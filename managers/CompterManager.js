const fs = require('fs');
const fileName = __dirname+"\\..\\data\\database.json";
const file = require(__dirname+"\\..\\data\\database.json");

module.exports.updateScore = function updateScore(userId){
    file.message.score++;
    file.message.pseudo = userId;
    fs.writeFile(fileName, JSON.stringify(file,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.getScore = () =>{
    return JSON.parse(fs.readFileSync(fileName).toString('utf-8')).message.score;
}

module.exports.resetScore = function resetScore(){
    file.message.score = 0;
    fs.writeFile(fileName, JSON.stringify(file,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.getRecord = function getRecord(){
    return require(fileName).message.record;
}


module.exports.updateRecord = function updateRecord(){
    if(file.message.record < module.exports.getScore()){
        file.message.record = module.exports.getScore()
    }
    fs.writeFile(fileName, JSON.stringify(file,null,2), function writeJSON(err) {
        if (err) return console.log(err);
    });
}

module.exports.getPseudo =  function getPseudo(){
    return require(fileName).message.pseudo;
}