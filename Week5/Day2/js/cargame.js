//Defines variable to access the canvas properties
var canvas = document.getElementById("canvas");

//Defines the Drawing Context
var ctx = canvas.getContext('2d');

var timer = requestAnimationFrame(main);

var xpos = 20;

var start = 50;
var finish = 750;

//bool for if game finishes

var gameOver = true;

//variable for image sprite
var raceCar = new Image();
raceCar.src = 'images/racecar.png';
raceCar.onload = function () {
    main();
};

//Fuel Variables
var startFuel = randomNumber(200, canvas.width);
var fuel = startFuel;
//variable for fuel bar
var fullBarWidth = 300;

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
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2)
    } else {
        if (!gameOver && sec > 0) {
            runStartTimer();
            drawStartTimer();
        } else {

            //Conditional to see if the game has started
            if (gameOver == false && fuel > 0 && sec <= 0) {
                //update position
                xpos += 1;
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
    drawCar();
    drawCarImage();

    //draw fuel bar
    drawFuelBar();
    drawFuelText();

    //determine if game is over
    if(xpos >= finish + 10 || fuel <= 0){
        drawResults();w
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
    ctx.fillStyle = 'red';
    ctx.fillRect(finish, 50, 10, 500);
}

function drawStartLine() {
    ctx.fillStyle = 'green';
    ctx.fillRect(start, 50, 10, 500);
}

function drawCar() {
    ctx.fillStyle = '#ffbe5f';
    ctx.fillRect(xpos, canvas.height / 2, 30, 20);
}

function drawCarImage() {
    ctx.drawImage(raceCar, xpos - 19, (canvas.height / 2 - 30), 50, 20);
}

function drawFuelBar() {
    var barCurrentWidth = fullBarWidth * getFuelPercentage();

    ctx.fillStyle = 'black';
    ctx.fillRect(start, 30, fullBarWidth, 10);
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
    ctx.font = '75px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(sec, canvas.width / 2, canvas.height / 2);
}

function randomNumber(high, low) {
    return Math.round(Math.random() * (high - low) + low);
}

function drawResults() {
    if (xpos > finish) {
        ctx.fillStyle = 'black';
        ctx.font = '75px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('You are win!', canvas.width / 2, canvas.height / 2);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '75px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('You lose! Good day sir.', canvas.width / 2, canvas.height / 2);
    }
}

function restartGame(){
    location.reload();
};