module.exports.config = {
    name: "joke",
    description: "Raconter une blague"
}
module.exports.execute = async function (member,channel,guild,args,Client,message){
    let blagues = {
        "Quelle mamie fait peur aux voleurs ?": "Mamie Traillette",
        "J'ai une blague sur les magasins": "Mais elle a pas supermarché",
        "Pourquoi est-ce c'est difficile de conduire dans le Nord ?": "Parce que les voitures arrêtent PAS DE CALER",
        "Pourquoi est-ce qu'on dit que les bretons sont tous frères et soeurs ?": "Parce qu’ils n’ont Quimper",
        "Pourquoi est-ce qu'on met tous les crocos en prison ?": "Parce que les crocos dealent",
        "Comment fait-on pour allumer un barbecue breton ?": "On utilise des breizh",
        "Pourquoi dit-on que les poissons travaillent illégalement ?": "Parce qu’ils n’ont pas de FISH de paie",
        "Quel est le bar préféré des espagnols ?": "Le Bar-celone",
        "Pourquoi est-ce que les mexicains mangent-ils aux toilettes ?": "Parce qu’ils aiment manger épicé",
        "Que faisaient les dinosaures quand ils n'arrivaient pas à se décider?": "Des tirageosaures",
        "Qu'est-ce qu'un tennisman adore faire ?": "Rendre des services",
        "Pourquoi est-ce que les vêtements sont toujours fatigués quand ils sortent de la machine ?": "Parce qu’ils sont léssivés",
        "Pourquoi est-ce que les livres ont-ils toujours chaud ?": "Parce qu’ils ont une couverture",
        "Où est-ce que les super héros vont-ils faire leurs courses ?": "Au supermarché",
        "Que se passe-t-il quand 2 poissons s'énervent ?": "Le thon monte",
        "Quel fruit est assez fort pour couper des arbres?": "Le ci-tron",
        "Quel est le jambon que tout le monde déteste ?": "Le sale ami",
        "Que fait un cendrier devant un ascenseur ?": "Il veut des cendres",
        "Que dit une imprimante dans l'eau ?": "J’ai papier",
        "Quel est l'aliment le plus hilarant?": "Le riz",
        "Quel est le sport préféré des insectes?": "Le criquet",
        "Deux souris voient passer une chauve-souris": "« Regarde, un ange ! »",
        "Les girafes n'existent pas...": "C’est un cou monté",
        "Pourquoi est ce que Hulk a un beau jardin ?": "Parce qu’il a la main verte",
        "C'est deux fous qui marchent dans la rue": "Le premier demande au second : « je peux me mettre au milieu ? »",
        "Qu'est-ce qu'un mort qui coupe du fromage ?": "Un fend-tome",
        "Comment est-ce que les abeilles communiquent entre elles ?": "Par e-miel",
        "Quel est l'arbre préféré des chômeurs ?": "Le bouleau",
        "Que dit-on d'une fleur qui a eu zéro à son contrôle ?": "Qu’elle s’est plantée",
        "Comment appelle-t-on un jeudi vraiment nul ?": "Une trajeudi",
        "Que fait un employé de chez Sephora à sa pause clope ?": "Il parfumer",
        "Qu'est-ce qu'une frite enceinte ?": "Une patate sautée",
        "Qu'est ce qu'une lampe moche ?": "Un LEDron",
        "Est-ce qu'une poule peut parle r anglais?": "Yes chicken",
        "Qui vit dans les tavernes ?": "Les hommes de bières",
        "Quelle est la danse préférée des chats ?": "Le cha cha cha",
    };
    setTimeout(()=>{message.delete()},500);
    let number = Math.floor(Math.random() * Object.keys(blagues).length)
    message.channel.send(Object.keys(blagues).at(number));
    setTimeout(()=>{message.channel.send(blagues[Object.keys(blagues).at(number)])},5000);
}