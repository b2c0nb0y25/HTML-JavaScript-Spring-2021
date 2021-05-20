//setup canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var timer = requestAnimationFrame(main);

var score = 0;

var gameOver = true;

var gameStates = [];
var currentState = 0;

//Main Screen
gameStates[0] = function(){
    ctx.save();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Asteroid Avoider', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '15px Arial';
    ctx.fillText('Press [space] to start!', canvas.width / 2, canvas.height / 2 + 20);
    ctx.restore();
}

//Game Screen
gameStates[1] = function(){
    //draws asteroids and checks positions
    for(i = 0; i < asteroids.length; i++){

        var dx = ship.x - asteroids[i].x;
        var dy = ship.y - asteroids[i].y;
        var distance = Math.sqrt((dx * dx) + (dy * dy))

        if(detectCollision(distance, (ship.h/2 + asteroids[i].radius))){
            console.log('Collision Detected');
            asteroids[i].color = 'orange';
            gameOver = true;
            currentState = 2;
            main();
        } else {
            asteroids[i].color = '#444444';
        }

        if(asteroids[i].y > canvas.height + asteroids[i].radius){
            asteroids[i].x = randomRange(canvas.width - asteroids[i].radius, asteroids[i].radius);
            asteroids[i].y = randomRange(canvas.height - asteroids[i].radius, asteroids[i].radius) - canvas.height;
            asteroids[i].vy = randomRange(10, 5);
        }

        if(!gameOver){
            asteroids[i].move();
            asteroids[i].drawAsteroid();
        }
    }

    //vertical movement
    if(ship.up){
        ship.vy = -7;
    } else {ship.vy = 3}

    //horizontal movement
    if(ship.left){
        ship.vx = -3
    } else if(ship.right){
        ship.vx = 3
    } else {
        ship.vx = 0
    }

    ctx.fillStyle = 'white'
    ctx.fillText(Math.floor(score), 10, 10);
    score += 1/10;

    if (!gameOver) {
        //updates ship position
        ship.move();

        //draws the ship
        ship.drawShip();
    }
}

//Game Over
gameStates[2] = function(){
    ctx.save();
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '15px Arial';
    ctx.fillText('Press [space] to play again!', canvas.width / 2, canvas.height / 2 + 20);
    ctx.restore();
}

//create an instance of the player ship
var ship = new PlayerShip();

//sets the number of asteroids
var numAsteroids = 20;
var asteroids = []

//generates a random number
function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

//setup keyboard event listeners
document.addEventListener('keydown', pressKeyDown);
document.addEventListener('keyup', pressKeyUp);

//Checks for WASD press
function pressKeyDown(e){
    if(!gameOver){
        if(e.keyCode == 87)
            ship.up = true;
        if(e.keyCode == 65)
            ship.left = true;
        if(e.keyCode == 68)
            ship.right = true;
        if(e.keyCode == 83)
            ship.down = true;
    }

    if(gameOver && currentState != 1){
        
    }

    if (currentState == 2) {
        if (e.keyCode == 32) {
            currentState = 0;
            main();
        }
    } else {
        if(e.keyCode == 32){
            currentState = 1;
            gameOver = false;
            main();
        }
    }
    
}

//checks for WASD release
function pressKeyUp(e){
    if(!gameOver){
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
function Asteroid(){
    this.radius = randomRange(15, 2);
    this.x = randomRange(canvas.width - this.radius, this.radius);
    this.y = randomRange(canvas.height - this.radius, this.radius) - canvas.height;
    this.vy = randomRange(10, 5)
    this.color = '#444444';

    this.move = function(){
        this.y += this.vy / 2;
    }

    this.drawAsteroid = function(){
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
function PlayerShip(){
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
        if(this.up || this.left || this.right){
            ctx.save();

            /*checks for rotation
            if(this.left)
                ctx.rotate(225 * Math.PI / 180);
            if(this.right)
                ctx.rotate(135 * Math.Pi / 180);*/
            
            //changes the drawing values to animate the flame
            if(this.flameLength == 50){
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

    this.move = function(){
        //moves the ship
        this.x += this.vx
        this.y += this.vy

        //bottom boundry collision
        if(this.y >= canvas.height - this.h / 2){
            this.y = canvas.height - this.h / 2;
            this.vy = 0;
        }
        
        //top boundry collision
        if(this.y < this.h / 2){
            this.y = this.h / 2;
            this.vy = 0;
        }
        
        //right boundry collision
        if(this.x >= canvas.width - this.w / 2){
            this.x = canvas.width - this.w / 2;
            this.vx = 0;
        }
        
        //left boundry collision
        if(this.x < this.w / 2){
            this.x = this.w / 2;
            this.vx = 0;
        }
    }
}

//for loop to create the instances of asteroids
for(i = 0; i < numAsteroids; i++){
    asteroids[i] = new Asteroid();
}

function main(){
    //clear canvas
    ctx.clearRect(0, 0, 1000, 800);

    //Seting the state
    gameStates[currentState]();

    //Next frame
    if(!gameOver){
        timer = requestAnimationFrame(main);
    }
}

function detectCollision(distance, calcDistance){
    return distance < calcDistance;
}