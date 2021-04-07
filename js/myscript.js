var imageOnMouse;
var fioc,sioc;
var tempScrollAlt, tempScrollSrc;
var games = ["Snake", "Pong"], indexGame = 0, nbGames = 2; 
var p1button, p2button, backbutton, rulesButton;
var buttonText, buttonAttribute;
var mySessionStorage = window.sessionStorage;


//ImageOnMouse représente l'image selectionnée pour effectuer l'animation lors du choix du jeu. 
//Il y a une vérification car, possédant la même classe, il faut distinguer l'image de choix de jeu à l'aperçu de jeu dans le paramétrage du jeu.
imageOnMouse = document.querySelector('.chosenOne');
document.querySelector(".chosenOne") == null ? imageOnMouse = document.querySelector(".GameOverview") : imageOnMouse = document.querySelector(".chosenOne");

//Ajout d'un évènement pour entrée de souris et dégagement de souris.
imageOnMouse?.addEventListener("mouseover", AnimateMe);
imageOnMouse?.addEventListener("mouseout", DeanimateMe);

function AnimateMe(){
    //Inversion des attributs alt et src pour obtenir le gif
    let tempSrc = imageOnMouse.src;
    imageOnMouse.src = imageOnMouse.alt;
    imageOnMouse.alt = tempSrc;
}

function DeanimateMe(){
    //Inversion des attributs alt et src pour obtenir l'image
    let tempAlt = imageOnMouse.alt;
    imageOnMouse.alt = imageOnMouse.src;
    imageOnMouse.src = tempAlt;
}

//fonction s'activant dès lors que l'on clique sur une flèche pour naviguer dans le menu des jeux
function Scroll(){
    fioc = document.querySelector(".fioc");
    sioc = document.querySelector(".sioc");
    fioc.classList.toggle("chosenOne");
    sioc.classList.toggle("chosenOne");
    
    imageOnMouse = document.querySelector('.chosenOne');
    imageOnMouse.addEventListener("mouseover", AnimateMe);
    imageOnMouse.addEventListener("mouseout", DeanimateMe);

    //Incrémentation du compteur et retour à 0 en cas de besoin afin de savoir sur quel jeu nous sommes
    indexGame + 1 == nbGames ? indexGame = 0 : indexGame += 1;  
}

function SelectGame(){
    //Ajout des attributs dans la session du navigateur, dans celle ci nous enregistrerons le nom du jeu et les images du jeu sélectionné pour l'aperçu de jeu et nous passerons a la page de paramétrage.
   mySessionStorage.setItem('gameName',games[indexGame]);
   mySessionStorage.setItem('gameSrc', document.querySelector(".chosenOne").src);
   mySessionStorage.setItem('gameAlt', document.querySelector(".chosenOne").alt);
   if (mySessionStorage.getItem('P1Name')) mySessionStorage.removeItem('P1Name');
   if (mySessionStorage.getItem('P2Name')) mySessionStorage.removeItem('P2Name');
   window.location.href = "settings.html";
}

//Si nous sommes déjà dans la page de paramétrage, nous mettons à jour les données pour qu'elles correspondent au jeu sélectionné.
if (window.location.toString().includes("settings.html")){
    document.querySelector(".PageTitle").innerHTML = "Paramétrage du " + mySessionStorage.getItem('gameName');
    document.querySelector(".GameOverview").src = mySessionStorage.getItem('gameSrc');
    document.querySelector(".GameOverview").alt = mySessionStorage.getItem('gameAlt');
    document.querySelector(".GameName").innerHTML = mySessionStorage.getItem("gameName");
}

//Ce fonctionnement est un changement dynamique de texte et de cible d'un bouton qui est dans la même page. Il gère donc l'écriture qu'il y a dessus ainsi que la cible en fonction de là où l'utilisateur était avant.
rulesButton = document.querySelector(".GetBackButton");    
var searchValue = new URLSearchParams(window.location.search)
var getValue = searchValue.get('path');

switch(getValue){
    case "settings":
        rulesButton.innerHTML = "Revenir aux paramètres";
        rulesButton.setAttribute("onclick","javascript: GetBackSettings()");
        break;

    case "ingame":            
        rulesButton.innerHTML = "Revenir au jeu";
        rulesButton.setAttribute("onclick","javascript: GetBackInGame()");
        break;
        
    default:
        //console.log("You came here without clicking a button, you've created such a mess.");
}
        
function GetRulesPreGame(){
    window.location.href = "rules.html?path=settings";        
}

function GetRulesInGame(){
    window.location.href = "rules.html?path=ingame";
}
function GetBackSettings(){        
    window.location = "settings.html";
}
function GetBackInGame(){
    window.location = "letsplay.html";
}


//Actualisation des textes dans l'écran de jeu et l'écran de règles du moment où l'on y est. Les données étant stockées dans la session il est simple de les recupérer.
if (document.querySelector(".MainGameTitle")) document.querySelector(".MainGameTitle").innerHTML = "Voici le jeu du " + mySessionStorage.getItem('gameName');

if(document.querySelector(".MainRulesTitle")) document.querySelector(".MainRulesTitle").innerHTML = "Voici les règles et les commandes du " + mySessionStorage.getItem('gameName');

//Cette partie est en fait la sélection du type de partie. au départ, il faut forcément en sélectionner une pour que le bouton pour jouer apparaisse.
//En fonction de la sélection, du style est appliqué et les zones de texte pour les pseudo apparaissent également.
var PlayersButtons = document.querySelectorAll(".GameMode");
var frstPDiv = document.querySelector(".FirstPlayerDiv");
var StartButton = document.querySelector(".StartGameButton");
var nickNameBlock = document.querySelector(".NickNameBlock");

PlayersButtons[0]?.addEventListener('click', () => {
    nickNameBlock.style.display ="flex";

    PlayersButtons[0].innerHTML = "<b>Ordinateur contre Joueur 2</b>";
    PlayersButtons[1].innerHTML = "Joueur1 contre Joueur2";
    frstPDiv.style.display="none";
    StartButton.style.display = "block";
    StartButton.classList.add("ReadyToStart");
    mySessionStorage.setItem('Player2NN',"");

});

PlayersButtons[1]?.addEventListener('click', () => {
    nickNameBlock.style.display ="flex";
    StartButton.style.display = "block";
    StartButton.classList.add("ReadyToStart");
    PlayersButtons[0].innerHTML = "Ordinateur contre Joueur 2";
    PlayersButtons[1].innerHTML = "<b>Joueur1 contre Joueur2</b>";
    frstPDiv.style.display="flex";
});

//Cette partie gère le côté vide ou non des zones de texte. En effet, si celles ci sont déjà vides et les messages d'erreurs sont affichés, alors les messages disparaissent dès lors qu'un pseudo est entré. 
var P1name = document.querySelector(".P1Name");
var P2name = document.querySelector(".P2Name");
var PErrorTags = document.querySelectorAll(".ErrorTag");

P1name?.addEventListener('input', () => {
    PErrorTags[0].style.display ="none";
});
P2name?.addEventListener('input', () => {
    PErrorTags[1].style.display ="none";
});


//Cette fonction est lancée lorsque l'on appuie sur le bouton de jouer au jeu après avoir effectué les paramétrages nécessaires. 
//Cette partie gère les zones d'insertion de texte vides.
//Si une zone est vide, on affiche les messages d'erreurs qui, de base, sont cachés.
function CheckAndPlay(){
    if (P1name.value == "") PErrorTags[0].style.display = "block";
    if (P2name.value == "") PErrorTags[1].style.display = "block";    
    if (((P2name.value != "") && (frstPDiv.style.display == "none")) || ((P1name.value !="" ) && (P2name.value !="" ))){

        mySessionStorage.setItem('Player1NN',document.querySelector(".P1Name").value);
        mySessionStorage.setItem('Player2NN',document.querySelector(".P2Name").value);
        
        window.location.href="letsplay.html";
    }
}

//Cette  partie gère l'écriture des pseudos  dans l'écran de jeu, en récupérant d'abord l'élément HTML qu'il faut modifier.
//L'écriture de pseudos se fait en fonction des noms insérés dans le stockage, le Joueur 2 est toujours présent mais le joueur 1 est remplacé par l'ordinateur si le nom est vidé.
var opposingP = document.querySelector(".OpposingDoods");

if(opposingP){
    mySessionStorage.getItem('Player1NN') ? opposingP.innerHTML = mySessionStorage.getItem('Player1NN') + " (J1) oppose " + mySessionStorage.getItem('Player2NN') + " (J2)!" : opposingP.innerHTML =  "L'Ordinateur oppose (J2) " + mySessionStorage.getItem('Player2NN') + "!";
} 


//Cette partie finalement gère de manière dynamique ce que la page unique de règles et de commandes doit afficher. Il est impossible de le mettre directement sur le document html de la page puisqu'il ne s'agit que d'une page donc les différents jeux ne pourraient pas y être expliqués.
var  commandsBlock = document.querySelectorAll(".RulesBlockP")[0]
var  rulesBlock = document.querySelectorAll(".RulesBlockP")[1]

switch(mySessionStorage.getItem('gameName')){
    case "Pong" : 
        commandsBlock.innerHTML = "Les commandes pour le Pong sont les suivantes : <br><br> Si vous jouer contre l'ordinateur, une ia extrêmement développée sera prête à fracasser le ballon au mieux pour vous empêcher de la refrapper et remporter le titre de meilleur tireur d'Europe. En parallèle vous pouvez diriger votre Rectangle? votre Barre? avec le déplacement de votre souris, en effet, le déplacement de votre souris (du haut vers le bas). <br> D'autre part, si vous jouez en joueur contre joueur, le Joueur 1 situé à gauche du canvas avec sa barre peut la diriger avec Z et S (Z pour monter la barre et S pour la descendre, la faire baisser hein, pas la tuer! la pauvre...). Enfin, le Joueur 2 pourra diriger sa barre avec la souris qui suit le même fonctionnement qu'expliqué au dessus du paragraphe.<br><br>Vous avez donc bien compris, détruisez le but adverse! (C'est pas vraiment un foot mais je savais pas comment vous motiver..."
        rulesBlock.innerHTML = "Les règles sont les suivantes : <br><br> Premièrement, le but ici est de marquer autant de buts que possible, jusqu'à ce que votre adversaire se fatigue, n'en puisse plus et vous vénère (sauf si c'est l'Ordinateur, dans ce cas là, je vous le précise, vous allez vous fatiguer avant lui...). Le ballon revient au centre à chaque but et chaque ballon que vous ne pouvez pas arrêter est considéré comme un but. Les règles étant assez simples je n'ai plus qu'à vous souhaiter un bon jeu! Et n'oubliez pas que VOUS êtes les meilleurs."
        break;
    case "Snake" : 
        commandsBlock.innerHTML = "Les commandes pour le Snake sont les suivantes : <br><br> Si vous jouez contre l'ordinateur, une ia extrêmement développée sera prête à faire de son mieux pour vous battre et remporter le titre de meilleur serpent d'Europe. En parallèle vous pouvez diriger votre Serpent (situé à droite du canvas en couleur vert plutôt foncé) avec les flèches directionnelles. <br> D'autre part, si vous jouez en joueur contre joueur, le Joueur 1 situé à gauche du canvas avec son serpent vert clair peut diriger sa bête avec les tocuhes ZQSD (Z haut, Q gauche, S bas et D droite). Enfin, le Joueur 2 pourra diriger sa bête avec les flèches directionnelles.<br><br> Vous avez donc bien compris; c'est tout bonnement incroyable que l'on puisse jouer ensemble et s'amuser sur un même clavier! Bonnes parties!"
        rulesBlock.innerHTML = "Les règles sont les suivantes :  <br><br> Premièrement, le but principal est de marquer le plus de points possibles. Pour ce faire, chaque serpent doit récupèrer (ou plutôt manger) des pommes rouges (bon, les pommes sont représentées par des carrés et le serpent aussi mais au moins les couleurs changent!). <br><br>/!\\ Mais attention! /!\\  Les collisions sont possibles ! Vous ne pouvez pas vous toucher, celui qui touche l'autre serpent OU un mur aura fait perdre la partie et donc les scores seront remis à 0 pour refaire une nouvelle partie, alors prenez soin de votre petite bête qui effectue des mouvements en accordéon."
        break;
}

