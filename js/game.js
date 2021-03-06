/*
CE FICHIER FAIT OFFICE DE CODE BACKEND POUR LE FONCTIONNEMENT DES DEUX JEUX, LE SNAKE ET LE PONG. 
CEPENDANT, MIS A PART LA PARTIE DEUX JOUEURS DES DEUX JEUX, TOUS LES JEUX ONT ETE REPRIS D INTERNET SUITE AUX INSTRUCTEURS DE NOTRE PROFFESSEURE REFERENTE. 
AINSI, TOUS LES CREDITS SONT DONC POUR : 
"https://blog.devoreve.com/2018/06/06/creer-un-pong-en-javascript/" POUR LE PONG 
"https://www.educative.io/blog/javascript-snake-game-tutorial" POUR LE SNAKE
ON LES REMERCIE GRANDEMENT POUR LEUR AIDE INDUBITABLE ET LEURS EXPLICATIONS CLAIRES ET PRECISES.

JORDA Marco et DEMAREST Alexis.
*/

var currentCanvas, context, gameData, gameStyle;
var gameState = "stopped";


const PLAYER_HEIGHT = 200;
const PLAYER_WIDTH = 15;


const board_border = 'black';
const board_background = "white";
const snake_border = 'dark';

let changing_direction = false;

let food_x;
let food_y;

var directions = [
                 {dx:   0, dy : -20},
                 {dx:  20, dy :   0},
                 {dx:   0, dy :  20},
                 {dx: -20, dy :   0}
                 ] //NESO

var directionIndex, iaSnakeCounter;

window.requestAnimationFrame = window.requestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||             
                               window.msRequestAnimationFrame;


currentCanvas = document.querySelector("#GameCanvas");

document.addEventListener('DOMContentLoaded', function () {

  //Cette partie sert de mise à jour des éléments html en fonction du jeu sélectionné et en fonction des pseudos et du type de jeu.
  var p1name = document.querySelector(".p1name");
  var p2name = document.querySelector(".p2name");

  if(mySessionStorage.getItem('Player1NN')){
    p1name.innerHTML = mySessionStorage.getItem('Player1NN');    
    p2name.innerHTML = mySessionStorage.getItem('Player2NN');
  }else{    
    p1name.innerHTML = "Ordinateur";
    p2name.innerHTML = mySessionStorage.getItem('Player2NN');
  }
  document.querySelector(".MainGameTitle").innerHTML = "Voici le jeu du " + mySessionStorage.getItem('gameName');
  context = currentCanvas.getContext('2d');
  mySessionStorage.getItem("Player1NN") ? gameStyle = "pvp" : gameStyle = "pvia";

  switch(mySessionStorage.getItem('gameName')){
    case 'Pong':
        //Mise en place des données pour le jeu PONG et lancement du jeu.
        gameData = {
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
              r: 15,
              speed: {
                x: 10,
                y: 10
              }
          }
        }
        StartPong();
        break;
    case 'Snake':      
        //Mise en place des données pour le jeu SNAKE et lancement du jeu.
        gameData = {
          player1: {
            snake: [
              {x: 500,  y: currentCanvas.height - 100},
              {x: 500,  y: currentCanvas.height - 80},
              {x: 500,  y: currentCanvas.height - 60},
              {x: 500,  y: currentCanvas.height - 40},
              {x: 500,  y: currentCanvas.height - 20}             
            ],
            snakeColor: 'lightgreen',
            snakeHead: {x: 500,  y: currentCanvas.height - 100},
            dx : 0,
            dy : -20,
            score: 0,
          },
          player2: {
            snake: [
              {x: currentCanvas.width - 500,   y: currentCanvas.height - 100},
              {x: currentCanvas.width - 500,   y: currentCanvas.height - 80},
              {x: currentCanvas.width - 500,   y: currentCanvas.height - 60},
              {x: currentCanvas.width - 500,   y: currentCanvas.height - 40},
              {x: currentCanvas.width - 500,   y: currentCanvas.height - 20}
            ],
            snakeColor: 'green',
            snakeHead: {x: currentCanvas.width - 500,   y: currentCanvas.height - 100},
            dx : 0,
            dy : -20,
            score: 0
          }
        }
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
  
  var key = event.keyCode;
  
  //Snake Consts
  const p2GoingUp = gameData.player2.dy === -20;
  const p2GoingDown = gameData.player2.dy === 20;
  const p2GoingRight = gameData.player2.dx === 20;  
  const p2GoingLeft = gameData.player2.dx === -20;

  const p1GoingUp = gameData.player1.dy === -20;
  const p1GoingDown = gameData.player1.dy === 20;
  const p1GoingRight = gameData.player1.dx === 20;  
  const p1GoingLeft = gameData.player1.dx === -20;

  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
      

  switch(key){
    case LEFT_KEY : 
      if(mySessionStorage.getItem('gameName') == 'Snake'){
        if(!p2GoingRight){
          gameData.player2.dx = -20;
          gameData.player2.dy = 0;
        }
      }
      break;
    case RIGHT_KEY : 
      if(mySessionStorage.getItem('gameName') == 'Snake'){
        if(!p2GoingLeft){
          gameData.player2.dx = 20;
          gameData.player2.dy = 0;
        }
      }
      break;
    case DOWN_KEY : 
      if(mySessionStorage.getItem('gameName') == 'Snake'){
        if(!p2GoingUp){
          gameData.player2.dx = 0;
          gameData.player2.dy = +20;
        }
      }
      break;
    case UP_KEY : 
      if(mySessionStorage.getItem('gameName') == 'Snake'){
        if(!p2GoingDown){
          gameData.player2.dx = 0;
          gameData.player2.dy = -20;
        }
      }
      break;
    case 90 :  
      //Z
      if(gameStyle == "pvp") {     
        if(mySessionStorage.getItem('gameName') == 'Pong'){
          gameData.player1.y -= 15; 
        }
        if(mySessionStorage.getItem('gameName') == 'Snake'){
          if(!p1GoingDown){
            gameData.player1.dx = 0;
            gameData.player1.dy = -20;
          }
        }
      }
      break;
    case 83 :         
      //S
      if(gameStyle == "pvp") {     
        if(mySessionStorage.getItem('gameName') == 'Pong'){
          gameData.player1.y += 15; 
        }
        if(mySessionStorage.getItem('gameName') == 'Snake'){
          if(!p1GoingUp){
            gameData.player1.dx = 0;
            gameData.player1.dy = 20;
          }            
        }
      }
      break;
    case 68 : 
      //D-Droite
      if(gameStyle == "pvp") {    
        if(mySessionStorage.getItem('gameName') == 'Snake'){
          if(!p1GoingLeft){
            gameData.player1.dx = 20;
            gameData.player1.dy = 0;
          }
        }
      }
      break;
    case 81 : 
      //Q-Gauche
      if(gameStyle == "pvp") {     
        if(mySessionStorage.getItem('gameName') == 'Snake'){
          if(!p1GoingRight){
            gameData.player1.dx = -20;
            gameData.player1.dy = 0;
          } 
        }
      }
      break;
    case 27 : 
      if (gameState == "paused") gameState = "started";
      else gameState = "paused";        
    break;
  }
}

//FONCTIONS POUR LE PONG 
//FONCTION DE LANCEMENT DU PONG 
function StartPong(){
  DrawPong();
  PlayPong();
}
//FONCTION DE DESSIN DU PONG 
function DrawPong(){
  // Draw field
  context.fillStyle = 'black';
  context.fillRect(0, 0, currentCanvas.width, currentCanvas.height);
  
  // Draw middle line
  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(currentCanvas.width / 2, 0);
  context.lineTo(currentCanvas.width / 2, currentCanvas.height);
  context.lineWidth = 5;
  context.stroke();
  
  // Draw players
  context.fillStyle = 'white';
  context.fillRect(5, gameData.player1.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  context.fillRect(currentCanvas.width - PLAYER_WIDTH - 5, gameData.player2.y, PLAYER_WIDTH, PLAYER_HEIGHT);
  
  // Draw ball
  context.beginPath();
  context.fillStyle = 'white';
  context.arc(gameData.ball.x, gameData.ball.y, gameData.ball.r, 0, Math.PI * 2, false);
  context.fill();
}
// FONCTION D ITERATION DU PONG, CETTE FONCTION EST RAPPELLEE POUR FAIRE LA BOUCLE D ANIMATION DU JEU
function PlayPong(){
  if(gameState == "started"){
    BallMoves();
    DrawPong();
    if(gameStyle == "pvia") PseudoIA();
  }
  requestAnimationFrame(PlayPong);
}
//FONCTION DE DEPLACEMENT DE LA BALLE
function BallMoves() {
  //Hits the bottom wall
  if (gameData.ball.y > currentCanvas.height || gameData.ball.y < 0) {
    gameData.ball.speed.y *= -1;
  } 
  //Hits a player, calls the collide function 
  if (gameData.ball.x > currentCanvas.width - PLAYER_WIDTH -10) {
    Collide(gameData.player2);
  } else if (gameData.ball.x < PLAYER_WIDTH + 10) {
    Collide(gameData.player1);
  }
  //We keep moving the ball
  gameData.ball.x += gameData.ball.speed.x;
  gameData.ball.y += gameData.ball.speed.y;
}
//FONCTION DE DEPLACEMENT DE L ORDINATEUR EN FONCTION DE LA BALLE ET SA VITESSE POUR NE PAS RENDRE LA PARTIE IMPOSSIBLE
function PseudoIA(){
  gameData.player1.y += gameData.ball.speed.y * 0.6;
}
//FONCTION DE GESTION DE COLLISION EN FONCTION DU JOUEUR PASSE EN PARAMETRE
function Collide(player){
  // The player1 does not hit the ball
  if (gameData.ball.y < player.y || gameData.ball.y >= player.y + PLAYER_HEIGHT) {
    if (player == gameData.player1) {
      gameData.player2.score++;
      document.querySelector('#player2-score').textContent = gameData.player2.score;
    } else {
      gameData.player1.score++;
      document.querySelector('#player1-score').textContent = gameData.player1.score;
    }
    // Set ball and players to the center
    gameData.ball.x = currentCanvas.width / 2;
    gameData.ball.y = currentCanvas.height / 2;
    gameData.player1.y = currentCanvas.height / 2 - PLAYER_HEIGHT / 2;
    gameData.player2.y = currentCanvas.height / 2 - PLAYER_HEIGHT / 2;
    
    // Reset speed
    gameData.ball.speed.x = 1;
  } else {
    // Increase speed and change direction
    gameData.ball.speed.x *= -1.1;
    ChangeDirection(player.y);
  }
}
//FONCTION D EVENEMENT LANCE DES QUE LA SOURIS SE DEPLACE ET QUI GERE DONC LE DEPLACEMENT DE LA BARRE DANS LE CANVAS EN FONCTION DU DEPLACEMENT DE LA SOURIS
function P2Moving(event){
  if(mySessionStorage.getItem('gameName') == 'Pong'){
    var canvasLocation = currentCanvas.getBoundingClientRect();
    var mouseLocation = event.clientY - canvasLocation.y;
    gameData.player2.y = Scale(mouseLocation, 0, window.innerHeight, -15, currentCanvas.height + PLAYER_HEIGHT);
  }
}
//FONCTION QUI FAIT CHANGER LA DIRECTION A LA BALLE LORSQUE L ON FAIT UNE COLLISION AVEC UN JOUEUR
function ChangeDirection(playerPosition) {
  var impact = gameData.ball.y - playerPosition - PLAYER_HEIGHT / 2;
  var ratio = 100 / (PLAYER_HEIGHT / 2);
  // Get a value between 0 and 10 
  gameData.ball.speed.y = Math.round(impact * ratio / 10);
}



//FONCTION DE DEPART DU JEU SNAKE
function StartSnake(){
  iaSnakeCounter = 0;
  drawSnakeCanvas();
  gen_food();
  PlaySnake();
}

//FONCTION D ITERATION DU JEU DE SNAKE
//PRECISIONS : LE JEU SE LANCE UNIQUEMENT SI LE STATUT DE JEU EST "started" ET L IA DU SNAKE ORDINATEUR CHANGE DE DIRECTION 5 FOIS MOINS VITE QUE LA POSSIBILITE DE CHANGER DE DIRECTION. 
// LE SET TIMEOUT EST ICI POUR RAPPELER LA FONCTION TOUS LES 100 MS.

function PlaySnake(){  
  if(gameState == "started"){
    if (hasGameEnded()) {
      gameOver();
      return;
    }
    iaSnakeCounter+=100;
    
    changing_direction = false;
    
    setTimeout(function onTick() {
      drawSnakeCanvas();    
      drawFood();
      moveSnakes();  
      if(gameStyle == "pvia") moveIASnake();
      drawSnake();
      // Call PlaySnake again
      PlaySnake();
    }, 100)
  }
}

// draw a border around the canvas
function drawSnakeCanvas() {
  //  Select the colour to fill the drawing
  context.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  context.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  context.fillRect(0, 0, currentCanvas.width, currentCanvas.height);
  // Draw a "border" around the entire canvas
  context.strokeRect(0, 0, currentCanvas.width, currentCanvas.height);
}

function drawSnake() {
  // Draw each part of each player's snake
  drawSnakePart(gameData.player1)
  drawSnakePart(gameData.player2)
}

// Draw one snake part
function drawSnakePart(player) {
    for (snakePart of player.snake){      
    // Set the colour of the snake part
    context.fillStyle = player.snakeColor;
    // Set the border colour of the snake part
    context.strokestyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    context.fillRect(snakePart.x, snakePart.y, 20, 20);
    // Draw a border around the snake part
    context.strokeRect(snakePart.x, snakePart.y, 20, 20);
  }
}
//CETTE FONCTION PROVOQUE LE DEPLACEMENT DU SNAKE DANS SA DIRECTION, ET SI UNE POMME EST MANGEE, AU LIEU DE RAJOUTER UNE DISTANCE AU SNAKE ON OMMET UNE FOIS LE DEPLACEMENT DU SNAKE POUR LE "RALLONGER" PUIS ON ACTUALISE LA NOUVELLE TETE EN GENERANT EGALEMENT UNE NOUVELLE POMME
function moveSnakes() 
{    
  let newHead = {x: gameData.player1.snake[0].x + gameData.player1.dx, y: gameData.player1.snake[0].y + gameData.player1.dy}
  
  gameData.player1.snakeHead = newHead;
  gameData.player1.snake.unshift(newHead);

  const p1has_eaten_food = gameData.player1.snakeHead.x === food_x && gameData.player1.snakeHead.y === food_y;
  if (p1has_eaten_food) {
    // Increase score
    gameData.player1.score += 10;
    // Display score on screen    
    document.querySelector('#player1-score').textContent = gameData.player1.score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    gameData.player1.snake.pop();
  }

  newHead = {x: gameData.player2.snake[0].x + gameData.player2.dx, y: gameData.player2.snake[0].y + gameData.player2.dy}

  gameData.player2.snakeHead = newHead;
  gameData.player2.snake.unshift(gameData.player2.snakeHead);
  
  if (gameData.player2.snakeHead.x == food_x && gameData.player2.snakeHead.y == food_y) {
    // Increase score
    gameData.player2.score += 10;
    // Display score on screen
    document.querySelector('#player2-score').textContent = gameData.player2.score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    gameData.player2.snake.pop();
  }
}

//FONCTION POUR RECHARGER LA PAGE UNE FOIS LA PARTIE TERMINEE 
function gameOver(){
  location.reload();
}
//FONCTION POUR DEPLACER LE SNAKE DE L ORDINATEUR QUI CONSISTE A PRENDRE UNE DIRECTION QUASIMENT AU HASARD AFIN DE NE PAS RENDRE LE SNAKE TROP DIFFICILE
function moveIASnake(){
  if(iaSnakeCounter == 500){
    iaSnakeCounter = 0;
    var chanceToMoveRight = Math.round(Math.random())
    const nesoDirectionArray = [gameData.player1.dy === 20, gameData.player1.dx === -20, gameData.player1.dy === -20, gameData.player1.dx === 20];
    //console.log(nesoDirectionArray)
    directionIndex = Math.floor(Math.random() * directions.length)
    while (nesoDirectionArray[directionIndex]) directionIndex = Math.floor(Math.random() * directions.length); 
    gameData.player1.dx = directions[directionIndex]["dx"];
    gameData.player1.dy = directions[directionIndex]["dy"];
  }
}
//FONCTION QUI DESSINE LA POMME
function drawFood() {
  context.fillStyle = 'red';
  context.strokestyle = 'lightred';
  context.fillRect(food_x, food_y, 20, 20);
  context.strokeRect(food_x, food_y, 20, 20);
}
//FONCTION QUI GENERE DES COORDONNEES AU HASARD POUR LA PROCHAINE POMME
function random_food(min, max) {
  let food = Math.round((Math.random() * (max-min) + min) / 10) * 10;
  while (food % 20 != 0){
    food = Math.round((Math.random() * (max-min) + min) / 10) * 10;
  }  
  return food
}
//FONCTION QUI GENERE LA POMME ET QUI VERIFIE QU ELLE N A PAS ETE GENEREE EN PLEIN DANS UN JOUEUR
function gen_food() {
  // Generate a random number the food x-coordinate
  food_x = random_food(0, currentCanvas.width - 10);
  // Generate a random number for the food y-coordinate
  food_y = random_food(0, currentCanvas.height - 10);
  
  // if the new food location is where a snake currently is, generate a new food location
  gameData.player1.snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
  gameData.player2.snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

//FONCTION VERIFIANT SI LA PARTIE EST TERMINEE OU NON 
function hasGameEnded() {
  const p1Check = didItHitSmth(gameData.player1.snake, gameData.player1.snakeHead, gameData.player2.snake)
  const p2Check = didItHitSmth(gameData.player2.snake, gameData.player2.snakeHead, gameData.player1.snake)

  return p1Check || p2Check;
}
//FONCTION VERIFIANT SI LE SNAKE PASSE EN PARAMETRE A EU UNE COLLISION AVEC QUELQUE CHOSE 
function didItHitSmth(snake, snakesHead, otherPSnake){
    //hit itself
    for (let i = 3; i < snake.length; i++) {
      if (snake[i].x === snakesHead.x && snake[i].y === snakesHead.y) return true            
    }

    //hit the other player
    for(let i = 0; i < otherPSnake.length; i++){
      if (otherPSnake[i].x === snakesHead.x && otherPSnake[i].y === snakesHead.y) return true            
    }

    const hitLeftWall = snake[0].x <= 0;
    const hitRightWall = snake[0].x >= currentCanvas.width - 10;
    const hitToptWall = snake[0].y <= 0;
    const hitBottomWall = snake[0].y >= currentCanvas.height - 10;

    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}