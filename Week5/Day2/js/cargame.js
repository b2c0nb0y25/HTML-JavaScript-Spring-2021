//Defines variable to access the canvas properties
var canvas = document.getElementById("canvas");

//Defines the Drawing Context
var ctx = canvas.getContext('2d');

var timer = requestAnimationFrame(main);

var xpos = 20;

var start = 58;
var finish = 956;

//bool for if game finishes

var gameOver = true;

//variable for image sprite
var joker = new Image();
joker.src = 'images/joker.png';
var yu = new Image();
yu.src = 'images/Yu_Sprite.png'
var p3mc = new Image();
p3mc.src = 'images/p3mc.png'
joker.onload = function () {
    main();
};

//Fuel Variables
var startFuel = randomNumber(100, 400);
var fuel = startFuel;
//variable for fuel bar
var fullBarWidth = 512;

//Countdown Variables
var sec = 3;
var fps = 60;
var frames = fps;

//add key presses
document.addEventListener('keydown', keyPressDown);
document.addEventListener('keyup', keyPressUp);

function main() {
    //call frame
    timer = requestAnimationFrame(main);

    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '30px Courier New';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'white'
        ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2);
        ctx.strokeText('Press Space to Start', canvas.width / 2, canvas.height / 2);
    } else {
        if (!gameOver && sec > 0) {
            runStartTimer();
            drawStartTimer();
        } else {

            //Conditional to see if the game has started
            if (gameOver == false && fuel > 0 && sec <= 0) {
                //update position
                xpos += 2;
                fuel -= Math.random();
            }
        };
    }



    /*resets car to left side
    if (xpos > canvas.width + 20) {
        xpos = -100;
    }*/

    //draw start/finish lines
    drawStartLine();
    drawFinishLine();

    //draw car
    // drawCar();
    drawCarImage();

    //draw fuel bar
    drawFuelBar();
    drawFuelText();

    //determine if game is over
    if(xpos >= finish || fuel <= 0){
        fuel = 0;
        drawResults();
    }
}

function keyPressDown(e) {
    console.log(e.keyCode);

    //pressing spacebar
    if (e.keyCode == 32) { 
        if(gameOver == false && fuel <= 0){
            restartGame();
        }
        //toggle game over on key press
        //gameOver = !gameOver;
        gameOver = false
    }
    //document.removeEventListener('keydown', keyPressDown);
}


function keyPressUp(e) {
    console.log(e.keyCode);

    //pressing spacebar
    if (e.keyCode == 32) {
        //document.addEventListener('keydown', keyPressDown);
    }
}

function drawFinishLine() {
    ctx.fillStyle = 'Black';
    ctx.strokeStyle = 'white'
    ctx.fillRect(finish, 50, 20, 668);
    ctx.strokeRect(finish, 50, 20, 668)
}

function drawStartLine() {
    ctx.fillStyle = 'White';
    ctx.fillRect(start, 50, 20, 668);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(start, 50, 20, 668);
}

function drawCar() {
    ctx.fillStyle = '#ffbe5f';
    ctx.fillRect(xpos, canvas.height / 2, 30, 20);
}

function drawCarImage() {
    ctx.drawImage(joker, xpos - 19, (canvas.height / 2 - 30), 36.8, 45);
    ctx.drawImage(yu, xpos - 19, (5/6) * canvas.height,  22.9, 45)
    ctx.drawImage(p3mc, xpos - 19, canvas.height / 6,  32, 45);
}

function drawFuelBar() {
    var barCurrentWidth = fullBarWidth * getFuelPercentage();

    ctx.fillStyle = 'black';
    ctx.fillRect(start - 2, 28, fullBarWidth + 4, 14);
    if (fuel > 0) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(start, 30, barCurrentWidth, 10);
    };
}

function getFuelPercentage() {
    return fuel / startFuel
}

function drawFuelText() {
    ctx.fillStyle = 'black';
    ctx.font = '25px Arial';
    ctx.fillText(Math.ceil(fuel) + '/' + startFuel, start, 25)
}

function runStartTimer() {
    frames -= 1;

    if (frames < 0) {
        frames = fps;
        sec -= 1;
    }
}

function drawStartTimer() {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.font = '75px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(sec, canvas.width / 2, canvas.height / 2);
    ctx.strokeText(sec, canvas.width / 2, canvas.height / 2);
}

function randomNumber(high, low) {
    return Math.round(Math.random() * (high - low) + low);
}

function drawResults() {
    if (xpos >= finish) {
        ctx.fillStyle = 'black';
        ctx.font = '75px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('You are win!', canvas.width / 2, canvas.height / 2);
        ctx.strokeStyle = 'white'
        ctx.strokeText('You are win!', canvas.width / 2, canvas.height / 2);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '75px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('You lose! Good day sir.', canvas.width / 2, canvas.height / 2);
        ctx.strokeStyle = 'white';
        ctx.strokeText('You lose! Good day sir.', canvas.width / 2, canvas.height / 2);
    }
}

function restartGame(){
    location.reload();
};