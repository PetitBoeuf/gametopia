//if ever timer : https://discourse.processing.org/t/working-with-html-css-and-p5-js/10970/4
var controllers = [];
var startPositions = []
var x = 500, y = 500; 
var gameCanvas;
var letsplay = false;

function preload(){
    for(let indexController = 0; indexController < 10; indexController++){
        
        let imageName = 'assets/c' + (indexController + 1).toString() + '.png';
        controllers[indexController] = loadImage(imageName);  
    }

}

function setup(){
    bgCanvas = createCanvas(window.innerWidth,window.innerHeight);
    if(document.querySelector("#GameCanvas")){
        gameCanvas = createGraphics(500,600);
        gameCanvas.parent("#GameCanvas");
        letsplay = true;
    }
    //bgCanvas.class('background');
    //console.log(controllers);
}

function draw(){    
    background(160);
    if (letsplay){
        drawGameCanvas();
    }
    /*
    for(let indexController = 0; indexController < 10; indexController++){
        image(controllers[indexController], x+=random(-10,10), y+=random(-10,10),175,150);  
    } 
    */   

}

function drawGameCanvas(){
    gameCanvas.background(0,0,0);
}