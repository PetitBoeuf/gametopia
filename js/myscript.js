var imageOnMouse;
var fioc,sioc,tioc;
var tempScrollAlt, tempScrollSrc;
var games = ["langue", "prank", "kiki"], indexGame = 1, nbGames = 3; 
var p1button, p2button;

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

function Play(){
    console.log("Vous allez donc jouer à : " + games[indexGame]);
}

function Select1P(){
    
    p1button = document.querySelectorAll(".GameMode")[0];
    p2button = document.querySelectorAll(".GameMode")[1];
    
}
/*
1."https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif"
2."https://media.giphy.com/media/JVGLHEuzbVviw/giphy.gif"
3."https://media.giphy.com/media/iFDtBQ0fC0DPCdiPBA/giphy.gif"
*/