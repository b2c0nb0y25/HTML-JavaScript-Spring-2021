var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var timer = requestAnimationFrame(main);

var gameStates = [];
var currentState = 0;
var xPos = 10;
var gameOver = true;

//setup keypresses
document.addEventListener('keydown', keyPressDown);
document.addEventListener('keyup', keyPressUp);

//Game States for Finite State Machine (FSM)
gameStates[0] = function(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'center';
    ctx.font = '60px Arial';
    ctx.fillText('Untitled HTML Game', canvas.width / 2, canvas.height / 2 - 25);
    ctx.font = '20px Arial';
    ctx.fillText('(Press Spacebar to Start)', canvas.width / 2, (canvas.height / 2) + 25);
}

gameStates[1] = function(){
    gameOver = false;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(xPos, canvas.height/2 - 25, 100, 50);
    xPos += 5;

    if(xPos >= 800){
        xPos = 10;
        currentState = 2;
        gameOver = true;
    }
}

gameStates[2] = function(){
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '60px Arial';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 25);
    ctx.font = '20px Arial';
    ctx.fillText('(Press Spacebar for Main Menu)', canvas.width / 2, (canvas.height / 2) + 25);
}

function main(){
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //Must add parentheses to functions called in this way
    gameStates[currentState]();

    //The main function
    timer = requestAnimationFrame(main);
}

function keyPressDown(e){
    console.log(e.keyCode);
    
}

function keyPressUp(e) {
    console.log(e.keyCode);
    if (gameOver == true) {
        if (e.keyCode == 32) {
            changeState();
        }
    }
}

function changeState(){
    console.log(currentState);
    if(currentState >= gameStates.length - 1){
        currentState = 0;
    } else {
        currentState++;
    }
}