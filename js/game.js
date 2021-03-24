var currentCanvas, context, game, gameStyle;
var gameState = "stopped";
const PLAYER_HEIGHT = 40;
const PLAYER_WIDTH = 4;
window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;


currentCanvas = document.querySelector("#GameCanvas");

document.addEventListener('DOMContentLoaded', function () {

  switch(mySessionStorage.getItem('gameName')){
    case 'Pong':
        context = currentCanvas.getContext('2d');
        mySessionStorage.getItem("Player2NN") ? gameStyle = "pvp" : gameStyle = "pvia";
        game = {
          player1: {
            y: currentCanvas.height / 2 - PLAYER_HEIGHT / 2,
            score: 0
          },
          player2: {
              y: currentCanvas.height / 2 - PLAYER_HEIGHT / 2,
              score: 0
          },
          ball: {
              x: currentCanvas.width / 2,
              y: currentCanvas.height / 2,
              r: 4,
              speed: {
                x: 1,
                y: 1
              }
          }
        }

        StartPong();
        break;
    case 'Flappy blue Bird':
        context = currentCanvas.getContext('2d');
        StartSnake();
        break;            
  }

});

function Scale(num, in_min, in_max, out_min, out_max){
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
currentCanvas.addEventListener('keydown', HandlePressedKey,true);
currentCanvas.addEventListener('mousemove', P2Moving);
currentCanvas.addEventListener('click', () => {
  gameState = "started";
});
function HandlePressedKey(event){
  if(gameStyle == "pvp") { 
    var key = event.keyCode;
    switch(key){
      case 90 :  
        game.player1.y -= 15;
        break;
      case 83 :         
        game.player1.y += 15;
        break;
      case 27 : 
        if (gameState == "paused") gameState = "started";
        else gameState = "paused";        
        break;
    }
  }
}
function PseudoIA(){
  game.player1.y += game.ball.speed.y * 0.50;
}
function BallMove() {
  if (game.ball.y > currentCanvas.height || game.ball.y < 0) {
    game.ball.speed.y *= -1;
  } 
  if (game.ball.x > currentCanvas.width - PLAYER_WIDTH - 5) {
    Collide(game.player2);
  } else if (game.ball.x < PLAYER_WIDTH + 5) {
    Collide(game.player1);
  }
  game.ball.x += game.ball.speed.x;
  game.ball.y += game.ball.speed.y;
}
function Collide(player){
  // The player1 does not hit the ball
  if (game.ball.y < player.y || game.ball.y >= player.y + PLAYER_HEIGHT) {
    if (player == game.player1) {
      game.player2.score++;
      document.querySelector('#player2-score').textContent = game.player2.score;
    } else {
      game.player1.score++;
      document.querySelector('#player1-score').textContent = game.player1.score;
    }
    // Set ball and players to the center
    game.ball.x = currentCanvas.width / 2;
    game.ball.y = currentCanvas.height / 2;
    game.player1.y = currentCanvas.height / 2 - PLAYER_HEIGHT / 2;
    game.player2.y = currentCanvas.height / 2 - PLAYER_HEIGHT / 2;
    
    // Reset speed
    game.ball.speed.x = 1;
  } else {
    // Increase speed and change direction
    game.ball.speed.x *= -1.1;
    ChangeDirection(player.y);
  }
}
function P2Moving(event){
  var canvasLocation = currentCanvas.getBoundingClientRect();
  var mouseLocation = event.clientY - canvasLocation.y;
  game.player2.y = Scale(mouseLocation, 0, window.innerHeight, -15, currentCanvas.height + PLAYER_HEIGHT);
}
function ChangeDirection(playerPosition) {
  var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
  var ratio = 100 / (PLAYER_HEIGHT / 2);
  // Get a value between 0 and 10
  game.ball.speed.y = Math.round(impact * ratio / 10);
}

function StartPong(){
  DrawPong();
  PlayPong();
}
function DrawPong(){
  // Draw field
  context.fillStyle = 'black';
  context.fillRect(0, 0, currentCanvas.width, currentCanvas.height);
  
  // Draw middle line
  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(currentCanvas.width / 2, 0);
  context.lineTo(currentCanvas.width / 2, currentCanvas.height);
  context.lineWidth = 1;
  context.stroke();
  
  // Draw players
  context.fillStyle = 'white';
  context.fillRect(5, game.player1.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  context.fillRect(currentCanvas.width - PLAYER_WIDTH - 5, game.player2.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  
  // Draw ball
  context.beginPath();
  context.fillStyle = 'white';
  context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false);
  context.fill();
}
function PlayPong(){
  if(gameState == "started"){
    BallMove();
    DrawPong();
    if(gameStyle == "pvia") PseudoIA();
  }
  requestAnimationFrame(PlayPong);
}

function StartSnake(){
  DrawSnake();
  PlaySnake();
}

function DrawSnake(){
}

function PlaySnake(){  
  DrawSnake();
  requestAnimationFrame(PlaySnake);
}