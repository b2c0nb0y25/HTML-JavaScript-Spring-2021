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

function gameStart() {
    //for loop to create the instances of asteroids
    for (i = 0; i < numAsteroids; i++) {
        asteroids[i] = new Asteroid();
    }



    //create an instance of the player ship
    ship = new PlayerShip();
}

//Main Screen
gameStates[0] = function () {
    ctx.save();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Asteroid Avoider', canvas.height / 2, canvas.height / 2 - 30);
    ctx.font = '15px Arial';
    ctx.fillText('Press [space] to start!', canvas.height / 2, canvas.height / 2 + 20);
    ctx.restore();
}

//Game Screen
gameStates[1] = function () {

    //HUD Code
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score.toString() + ' Asteroids: ' + numAsteroids, canvas.height - 250, 30);
    ctx.fillText('Level: ' + level, canvas.height - 250, 50);
    ctx.restore();

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.rotate(1.5708);

    height = canvas.height;
    width = canvas.height
    
    //draws asteroids and checks positions
    for (i = 0; i < asteroids.length; i++) {

        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var distance = Math.sqrt((dx * dx) + (dy * dy))

        if (detectCollision(distance, (ship.h / 2 + asteroids[i].radius))) {
            console.log('Collision Detected');
            asteroids[i].color = 'orange';
            gameOver = true;
            currentState = 2;
            main();
        } else {
            asteroids[i].color = '#444444';
        }

        if (asteroids[i].y > height + asteroids[i].radius) {
            asteroids[i].x = randomRange(height - asteroids[i].radius, asteroids[i].radius);
            asteroids[i].y = randomRange(width - asteroids[i].radius, asteroids[i].radius) - width;
            asteroids[i].vy = randomRange(10, 5);
        }

        if (!gameOver) {
            asteroids[i].move();
            asteroids[i].drawAsteroid();
        }
    }

    //vertical movement
    if (ship.up) {
        ship.vy = -7;
    } else { ship.vy = 3 }

    //horizontal movement
    if (ship.left) {
        ship.vx = -3
    } else if (ship.right) {
        ship.vx = 3
    } else {
        ship.vx = 0
    }


    if (!gameOver) {
        //updates ship position
        ship.move();

        //draws the ship
        ship.drawShip();
    }

    ctx.restore();

    while (asteroids.length < numAsteroids) {
        asteroids.push(new Asteroid());
    }
}

//Game Over
gameStates[2] = function () {
    if (score > highScore) {

        ctx.save();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER! Your score was: ' + score, canvas.height / 2, canvas.height / 2 - 60);

        highScore = score;

        ctx.fillText('Your high score is: ' + highScore + '! NEW RECORD!!', canvas.height / 2, canvas.height / 2 - 30);
        ctx.font = '15px Arial';
        ctx.fillText('Press [space] to play again!', canvas.height / 2, canvas.height / 2 + 20);
        ctx.restore();
    } else {
        //no new high score
        ctx.save();
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER! Your score was: ' + score, canvas.height / 2, canvas.height / 2 - 60);

        ctx.fillText('Your high score is: ' + highScore, canvas.height / 2, canvas.height / 2 - 30);
        ctx.font = '15px Arial';
        ctx.fillText('Press [space] to play again!', canvas.height / 2, canvas.height / 2 + 20);
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
        if (e.keyCode == 65)
            ship.left = false;
        if (e.keyCode == 68)
            ship.right = false;
        if (e.keyCode == 83)
            ship.down = false;
    }

}



//constructor for asteroids
function Asteroid() {
    this.radius = randomRange(15, 2);
    this.x = randomRange(canvas.height - this.radius, this.radius);
    this.y = randomRange(canvas.height - this.radius, this.radius) - canvas.height;
    this.vy = randomRange(10, 5)
    this.color = '#444444';

    this.move = function () {
        this.y += this.vy / 2;
    }

    this.drawAsteroid = function () {
        ctx.save();

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

//Constructor Function
function PlayerShip() {
    //x position
    this.x = canvas.height / 2;
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
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(10, 15);
        ctx.lineTo(0, 10);
        ctx.lineTo(-10, 15);
        ctx.lineTo(0, -15);
        ctx.closePath();
        ctx.fill();

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
        if (this.x >= canvas.height - this.w / 2) {
            this.x = canvas.height - this.w / 2;
            this.vx = 0;
        }

        //left boundry collision
        if (this.x < this.w / 2) {
            this.x = this.w / 2;
            this.vx = 0;
        }
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
        console.log('working')
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