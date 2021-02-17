//if ever timer : https://discourse.processing.org/t/working-with-html-css-and-p5-js/10970/4
var controllers = [];
var startPositions = []
var x = 500, y = 500; 

function preload(){
    for(let indexController = 0; indexController < 10; indexController++){
        
        let imageName = 'assets/c' + (indexController + 1).toString() + '.png';
        controllers[indexController] = loadImage(imageName);  
    }

}

function setup(){
    bgCanvas = createCanvas(window.innerWidth,window.innerHeight);
    bgCanvas.class('background');
    //console.log(controllers);
}

function draw(){    
    background(160,160,160);

    /*
    for(let indexController = 0; indexController < 10; indexController++){
        image(controllers[indexController], x+=random(-10,10), y+=random(-10,10),175,150);  
    } 
    */   

}