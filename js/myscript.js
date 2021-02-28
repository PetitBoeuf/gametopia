var imageOnMouse;
var fioc,sioc,tioc;
var tempScrollAlt, tempScrollSrc;
var games = ["Langue", "Kiki", "Prank"], indexGame = 1, nbGames = 3; 
var p1button, p2button, backbutton, rulesButton;
var buttonText, buttonAttribute;
var mySessionStorage = window.sessionStorage;

function AnimateMe(){
    imageOnMouse = document.querySelector('#centeredOne');
    document.querySelector("#centeredOne") == null ? imageOnMouse = document.querySelector(".GameOverview") : imageOnMouse = document.querySelector("#centeredOne");
    let tempSrc = imageOnMouse.src;
    imageOnMouse.src = imageOnMouse.alt;
    imageOnMouse.alt = tempSrc;
}

function DeanimateMe(){
    let tempAlt = imageOnMouse.alt;
    imageOnMouse.alt = imageOnMouse.src;
    imageOnMouse.src = tempAlt;
}

function ScrollRight(){
    fioc = document.querySelector(".fioc");
    sioc = document.querySelector(".sioc");
    tioc = document.querySelector(".tioc");
    tempScrollSrc = fioc.src;  tempScrollAlt = fioc.alt;              
    fioc.src = sioc.src;  fioc.alt = sioc.alt;   
    sioc.src = tioc.src;  sioc.alt = tioc.alt;   
    tioc.src = tempScrollSrc;  tioc.alt = tempScrollAlt;   

    indexGame + 1 == nbGames ? indexGame = 0 : indexGame += 1;
}

function ScrollLeft(){
    fioc = document.querySelector(".fioc");
    sioc = document.querySelector(".sioc");
    tioc = document.querySelector(".tioc");
    tempScrollSrc = tioc.src;  tempScrollAlt = tioc.alt;              
    tioc.src = sioc.src;  tioc.alt = sioc.alt;   
    sioc.src = fioc.src;  sioc.alt = fioc.alt;   
    fioc.src = tempScrollSrc;  fioc.alt = tempScrollAlt; 

    indexGame - 1 < 0 ? indexGame = nbGames - 1 : indexGame -= 1;
}

function SelectGame(){
   mySessionStorage.setItem('gameName',games[indexGame]);
   mySessionStorage.setItem('gameSrc', document.querySelector("#centeredOne").src);
   mySessionStorage.setItem('gameAlt', document.querySelector("#centeredOne").alt);
   if (mySessionStorage.getItem('P1Name')) mySessionStorage.removeItem('P1Name');
   if (mySessionStorage.getItem('P2Name')) mySessionStorage.removeItem('P2Name');
   window.location.href = "settings.html";
}
if (window.location.toString().includes("settings.html")){
    document.querySelector(".PageTitle").innerHTML = "Paramétrage du " + mySessionStorage.getItem('gameName');
    document.querySelector(".GameOverview").src = mySessionStorage.getItem('gameSrc');
    document.querySelector(".GameOverview").alt = mySessionStorage.getItem('gameAlt');
    document.querySelector(".GameName").innerHTML = mySessionStorage.getItem("gameName");
}


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

function GetBackSettings(){        
    window.location = "settings.html";
}
function GetBackInGame(){
    window.location = "letsplay.html";
}

var P1name = document.querySelector(".P1Name");
var P2name = document.querySelector(".P2Name");
var PErrorTags = document.querySelectorAll(".ErrorTag");

P1name?.addEventListener('input', () => {
    PErrorTags[0].style.display ="none";
});
P2name?.addEventListener('input', () => {
    PErrorTags[1].style.display ="none";
});

if (document.querySelector(".MainGameTitle")) document.querySelector(".MainGameTitle").innerHTML = "Voici le jeu du " + mySessionStorage.getItem('gameName');

if(document.querySelector(".MainRulesTitle")) document.querySelector(".MainRulesTitle").innerHTML = "Voici les règles et les commandes du " + mySessionStorge.getItem('gameName');


var PlayersButtons = document.querySelectorAll(".GameMode");
var scdPDiv = document.querySelector(".SecondPlayerDiv");
var StartButton = document.querySelector(".StartGameButton");

PlayersButtons[0]?.addEventListener('click', () => {
    PlayersButtons[0].innerHTML = "<b>Joueur contre Ordinateur</b>";
    PlayersButtons[1].innerHTML = "Joueur contre Joueur";
    scdPDiv.style.display="none";
    StartButton.style.display = "block";
    StartButton.classList.add("ReadyToStart");
    mySessionStorage.setItem('Player2NN',"");

});

PlayersButtons[1]?.addEventListener('click', () => {
    StartButton.style.display = "block";
    StartButton.classList.add("ReadyToStart");
    PlayersButtons[0].innerHTML = "Joueur contre Ordinateur";
    PlayersButtons[1].innerHTML = "<b>Joueur contre Joueur</b>";
    scdPDiv.style.display="flex";
});


function GetRulesPreGame(){
    window.location.href = "rules.html?path=settings";        
    /*
    document.cookie = "buttonText=Revenir aux paramètres";
    document.cookie = "buttonAttribute=GetBackSettings()";
    */
}

function GetRulesInGame(){
    /*
    document.cookie = "buttonText=Revenir à la partie en cours";
    document.cookie="buttonAttribute=GetBackInGame()";
    */
    window.location.href = "rules.html?path=ingame";
}

/*
buttonText = document.cookie.split(";")[0].split("=")[1];
buttonAttribute = document.cookie.split(";")[1].split("=")[1];
rulesButton = document.querySelector(".GetBackButton");
rulesButton.innerHTML = buttonText;
rulesButton.setAttribute("onclick","javascript: " + buttonAttribute);
*/

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

function GetBackSettings(){        
    window.location = "settings.html";
}
function GetBackInGame(){
    window.location = "letsplay.html";
}

var P1name = document.querySelector(".P1Name");
var P2name = document.querySelector(".P2Name");
var PErrorTags = document.querySelectorAll(".ErrorTag");

P1name?.addEventListener('input', () => {
    PErrorTags[0].style.display ="none";
});
P2name?.addEventListener('input', () => {
    PErrorTags[1].style.display ="none";
});


function CheckAndPlay(){
    
    if (P1name.value == "") PErrorTags[0].style.display = "block";
    if (P2name.value == "") PErrorTags[1].style.display = "block";    
    if (((P1name.value != "") && (scdPDiv.style.display == "none")) || ((P1name.value !="" ) && (P2name.value !="" ))){

        mySessionStorage.setItem('Player1NN',document.querySelector(".P1Name").value);
        mySessionStorage.setItem('Player2NN',document.querySelector(".P2Name").value);
        
        window.location.href="letsplay.html";
    }
}

var opposingP = document.querySelector(".OpposingDoods");

if(opposingP){
    mySessionStorage.getItem('Player2NN') ? opposingP.innerHTML = mySessionStorage.getItem('Player1NN') + " (J1) oppose " + mySessionStorage.getItem('Player2NN') + " (J2)!" : opposingP.innerHTML = mySessionStorage.getItem('Player1NN') + " (J1) oppose l'Ordinateur !";
} 



/*
1."https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"
2."https://media.giphy.com/media/JVGLHEuzbVviw/giphy.gif"
3."https://media.giphy.com/media/iFDtBQ0fC0DPCdiPBA/giphy.gif"
*/
