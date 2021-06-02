//setup canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var timer = requestAnimationFrame(main);

var score = 0;
var highScore = 0;

var gameOver = true;

var gameStates = [];
var currentState = 0;

var level = 1;

var ship;

var sec = 5;
var fps = 60;
var frames = fps;

var asteroidIMG = new Image();
asteroidIMG.src = 'images/asteroidSprite.png';

asteroidIMG.onload = function(){
    main();
};

var shipIMG = new Image();
shipIMG.src = 'images/shipSprite.png';

shipIMG.onload = function(){
    main();
};

var powerUpIMG = new Image();
powerUpIMG.src = 'images/powerupSprite.png';

powerUpIMG.onload = function(){
    main();
};

var startIMG = new Image();
startIMG.src = 'images/start.png';

startIMG.onload = function(){
    main();
};

var endIMG = new Image();
endIMG.src = 'images/end.png';

endIMG.onload = function(){
    main();
};

var waiting = false;

//constructor for asteroids
function Asteroid() {
    this.radius = randomRange(25, 15);
    this.x = randomRange(canvas.width + this.radius, canvas.width) + canvas.width;
    this.y = randomRange(canvas.height - this.radius, this.radius);
    this.vy = randomRange(10, 5)
    this.color = '#444444';

    this.move = function () {
        this.x -= this.vy / 2;
    }

    this.drawAsteroid = function () {
        /*ctx.save();

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();

        ctx.restore();*/
        ctx.drawImage(asteroidIMG, this.x, this.y, this.radius, this.radius);
    }
}

function PowerUp() {
    this.radius = randomRange(30, 20);
    this.x = randomRange(canvas.width + this.radius, canvas.width) + canvas.width;
    this.y = randomRange(canvas.height - this.radius, this.radius);
    this.vy = randomRange(10, 5)
    this.color = 'red';

    this.move = function () {
        this.x -= this.vy / 2;
    }

    this.drawPowerUp = function () {
        ctx.save();

        /*ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();*/
        ctx.drawImage(powerUpIMG, this.x, this.y, this.radius, this.radius);

        ctx.restore();
    }
}

var noDeath = new PowerUp()

function waitTimer() {
    waiting = !waiting;
    console.log('go');
}

function swapGod() {
    sec = 5;
    ship.god = !ship.god;
}

//Constructor Function
function PlayerShip() {
    //x position
    this.x = canvas.width / 2;
    //y position
    this.y = canvas.height / 2;
    //width
    this.w = 20;
    //height
    this.h = 30;
    //vertical velocity
    this.vx = 0;
    //horizontal velocity
    this.vy = 0;
    this.god = false;

    //movement booleans
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;

    //afterburner length
    this.flameLength = 50;

    //draws the ship
    this.drawShip = function () {
        //Shifts the origin
        ctx.save();
        ctx.translate(this.x, this.y);

        //afterburner condition
        if (this.up || this.left || this.right) {
            ctx.save();
            ctx.rotate(1.5081)

            /*checks for rotation
            if(this.left)
                ctx.rotate(225 * Math.PI / 180);
            if(this.right)
                ctx.rotate(135 * Math.Pi / 180);*/

            //changes the drawing values to animate the flame
            if (this.flameLength == 50) {
                this.flameLength = 30;
            } else {
                this.flameLength = 50;
            }
            
            ctx.beginPath();
            ctx.fillStyle = 'orange';
            ctx.moveTo(0, 5);
            ctx.lineTo(5, 5);
            ctx.lineTo(0, this.flameLength);
            ctx.lineTo(-5, 5);
            ctx.moveTo(0, 5);

            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        //draw the ship

        /*
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(10, 15);
        ctx.lineTo(0, 10);
        ctx.lineTo(-10, 15);
        ctx.lineTo(0, -15);
        ctx.closePath();
        ctx.fill();
        */

        ctx.drawImage(shipIMG, -16, -16)

        //restores the origin
        ctx.restore();
    }

    this.move = function () {
        //moves the ship
        this.x += this.vx
        this.y += this.vy

        //bottom boundry collision
        if (this.y >= canvas.height - this.h / 2) {
            this.y = canvas.height - this.h / 2;
            this.vy = 0;
        }

        //top boundry collision
        if (this.y < this.h / 2) {
            this.y = this.h / 2;
            this.vy = 0;
        }

        //right boundry collision
        if (this.x >= canvas.width - this.w / 2) {
            this.x = canvas.width - this.w / 2;
            this.vx = 0;
        }

        //left boundry collision
        if (this.x < this.w / 2) {
            this.x = this.w / 2;
            this.vx = 0;
        }
    }
}

function gameStart() {
    //for loop to create the instances of asteroids
    for (i = 0; i < numAsteroids; i++) {
        asteroids[i] = new Asteroid();
    }

    noDeath = new PowerUp();

    waiting = false;

    //create an instance of the player ship
    ship = new PlayerShip();
}

//Main Screen
gameStates[0] = function () {
    ctx.save();
    ctx.drawImage(startIMG, 0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Houston, Problems Incoming!', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '15px Arial';
    ctx.fillText('Press [space] to start!', canvas.width / 2, canvas.height / 2 + 20);
    ctx.restore();
}

//Game Screen
gameStates[1] = function () {

    //HUD Code
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score.toString() + ' Asteroids: ' + numAsteroids, canvas.width - 250, 30);
    ctx.fillText('Level: ' + level, canvas.width - 250, 50);
    ctx.restore();

    if (waiting == false) {
        noDeath.move();
        noDeath.drawPowerUp();
        console.log(noDeath.x + ', ' + noDeath.y)
        //console.log('not waiting')
    } else {
        console.log('waiting');
    }



    //Checks for Powerup Collision
    var Pdx = ship.x - noDeath.x;
    var Pdy = ship.y - noDeath.y;
    var Pdistance = Math.sqrt((Pdx * Pdx) + (Pdy * Pdy));

    if (detectCollision(Pdistance, (ship.h / 2 + noDeath.radius))) {
        console.log('immune');
        noDeath.x = randomRange(canvas.width + noDeath.radius, canvas.width) + canvas.width;
        noDeath.y = randomRange(canvas.height - noDeath.radius, noDeath.radius);
        noDeath.vy = randomRange(10, 5);
        waiting = true;
        ship.god = true;
        setTimeout(swapGod, 5000);
        setTimeout(waitTimer, 10000);
        console.log('wait');
    }

    if (noDeath.x < -noDeath.radius) {
        noDeath.x = randomRange(canvas.width + noDeath.radius, canvas.width) + canvas.width;
        noDeath.y = randomRange(canvas.height - noDeath.radius, noDeath.radius);
        noDeath.vy = randomRange(10, 5);
        waiting = true;
        setTimeout(waitTimer, 10000);
        console.log('wait');

    }


    //draws asteroids and checks positions
    for (i = 0; i < asteroids.length; i++) {

        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var distance = Math.sqrt((dx * dx) + (dy * dy))

        if (!ship.god) {
            if (detectCollision(distance, (ship.h / 2 + asteroids[i].radius))) {
                console.log('Collision Detected');
                asteroids[i].color = 'orange';
                gameOver = true;
                currentState = 2;
                main();
            } else {
                asteroids[i].color = '#444444';
            }
        }

        if (asteroids[i].x < -asteroids[i].radius) {
            asteroids[i].x = randomRange(canvas.width + asteroids[i].radius, canvas.width) + canvas.width;
            asteroids[i].y = randomRange(canvas.height - asteroids[i].radius, asteroids[i].radius);
            asteroids[i].vy = randomRange(10, 5);
        }

        if (!gameOver) {
            asteroids[i].move();
            asteroids[i].drawAsteroid();
        }
    }

    //vertical movement
    if (ship.up) {
        ship.vy = -3;
    } else if (ship.down) {
        ship.vy = 3
    }

    //horizontal movement
    if (ship.left) {
        ship.vx = -6;
    } else if (ship.right) {
        ship.vx = 3;
    } else {
        ship.vx = -3;
    }


    if (!gameOver) {
        //updates ship position
        ship.move();

        //draws the ship
        ship.drawShip();
    }

    while (asteroids.length < numAsteroids) {
        asteroids.push(new Asteroid());
    }
}

//Game Over
gameStates[2] = function () {
    ctx.drawImage(endIMG, 0, 0, canvas.width, canvas.height);
    if (score > highScore) {

        ctx.save();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER! Your score was: ' + score, canvas.width / 2, canvas.height / 2 - 60);

        highScore = score;

        ctx.fillText('Your high score is: ' + highScore + '! NEW RECORD!!', canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '15px Arial';
        ctx.fillText('Press [space] to play again!', canvas.width / 2, canvas.height / 2 + 20);
        ctx.restore();
    } else {
        //no new high score
        ctx.save();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER! Your score was: ' + score, canvas.width / 2, canvas.height / 2 - 60);

        ctx.fillText('Your high score is: ' + highScore, canvas.width / 2, canvas.height / 2 - 30);
        ctx.font = '15px Arial';
        ctx.fillText('Press [space] to play again!', canvas.width / 2, canvas.height / 2 + 20);
        ctx.restore();
    }

}

//sets the number of asteroids
var numAsteroids = 20;
var asteroids = []

//generates a random number
function randomRange(high, low) {
    return Math.random() * (high - low) + low;
}

//setup keyboard event listeners
document.addEventListener('keydown', pressKeyDown);
document.addEventListener('keyup', pressKeyUp);

//Checks for WASD press
function pressKeyDown(e) {
    if (!gameOver) {
        if (e.keyCode == 87)
            ship.up = true;
        if (e.keyCode == 65)
            ship.left = true;
        if (e.keyCode == 68)
            ship.right = true;
        if (e.keyCode == 83)
            ship.down = true;
    }
    if (gameOver) {
        if (currentState == 2) {
            if (e.keyCode == 32) {
                //restarts game
                currentState = 0;

                score = 0;

                //resets asteroids
                numAsteroids = 20;
                asteroids = []
                waiting = false;
                gameStart();

                main();
            }
        } else {
            if (e.keyCode == 32) {
                //starts the game 
                gameStart();

                currentState = 1;
                gameOver = false;
                main();
                scoreTimer();
            }
        }
    }

}

//checks for WASD release
function pressKeyUp(e) {
    if (!gameOver) {
        if (e.keyCode == 87)
            ship.up = false;
        ship.vy = 0
        if (e.keyCode == 65)
            ship.left = false;
        if (e.keyCode == 68)
            ship.right = false;
        ship.vx = 0
        if (e.keyCode == 83)
            ship.down = false;
        ship.vy = 0;
    }

}

function main() {
    //clear canvas
    ctx.clearRect(0, 0, 1000, 800);

    //Seting the state
    gameStates[currentState]();

    //Next frame
    if (!gameOver) {
        timer = requestAnimationFrame(main);
    }
}

function detectCollision(distance, calcDistance) {
    return distance < calcDistance;
}

//Score
function scoreTimer() {
    if (!gameOver) {
        score += 1;

        //using modulo returns the remainder
        if (score % 5 == 0) {
            numAsteroids += 5;
        }
        if (score % 10 == 0) {
            numAsteroids += 10;
            level++
        }
        if (score % 20 == 0) {
            numAsteroids += 20;
        }

        setTimeout(scoreTimer, 1000);
    }
}