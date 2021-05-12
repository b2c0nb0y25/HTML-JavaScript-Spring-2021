var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function randomRange(high, low){
    return Math.random() * (high - low) + low;
}

function GameObject(){
    //These are examples of properties in a class
    this.radius = randomRange(100, 80);
    this.color = `rgb(${randomRange(255, 0)}, ${randomRange(255, 0)}, ${randomRange(255, 0)})`
    this.x = canvas.width * 0.5 //randomRange(canvas.width, 0);
    this.y = canvas.height * 0.5 //randomRange(canvas.height, 0);
    this.vx = randomRange(3, -3);
    this.vy = randomRange(3, -3);

    //These are examples of methods in a class
    this.drawCirle = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0 , 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    this.drawSquare = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - (this.radius * 0.5), this.y - (this.radius * 0.5), this.radius, this.radius)
    }
    
    this.drawSprite = function(){
        ctx.drawImage(rupeeImg, this.x - (this.radius * 0.5), this.y - (this.radius * 0.5), this.radius, this.radius)
    }

    //this method handles the movement
    this.move = function(){
        this.x += this.vx;
        this.y += this.vy;

        //canvas collision
        if(this.y > canvas.height - this.radius /*|| */){
            this.y = canvas.height - this.radius;
            this.vy = -this.vy * friction;
        }

        if(this.y < this.radius){
            this.y = this.radius;
            this.vy = -this.vy * friction;
        }

        //Left Side
        if(this.x < this.radius){
            this.x = this.radius;
            this.vx = -this.vx * friction;
        }
        //Right Side
        if(this.x > canvas.width - this.radius){
            this.x = canvas.width - this.radius;
            this.vx = -this.vx * friction;
        }

    }
}

//Create an instance of the GameObject class
//var particle = new GameObject();


//Can change properties using syntax: particle.x = 10;
//particle.drawCirle();

//create an array of particles
var particles = [];

var gravity = 0.1;
var numParticles = 50;
var friction = 1.2;

var rupeeImg = new Image();
rupeeImg.src = 'images/rupee.png';

rupeeImg.onload  = function(){
    main();
};

var timer = requestAnimationFrame(main);

for(i = 0; i < numParticles; i++){
    particles[i] = new GameObject; 
    /*if(i % 2 == 0){
        particles[i].drawCirle();
    } else {
        particles[i].drawSquare();
    }*/
    particles[i].drawSprite();
}



function main(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(i = 0; i < particles.length; i++){

        particles[i].vy += gravity;
        particles[i].move()

        for(j = 0; j < particles.length; j++){
            if(particles[i] != particles[j]){
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < particles[i].radius + particles[j].radius){
                    //particles[i].vx *= -1;
                    //particles[i].vy *= -1;
                    //particles[j].vx *= -1;
                    //particles[j].vy *= -1;
                }
            }
        }

        /*if(i % 2 == 0){
            particles[i].drawCirle();
        } else {
            particles[i].drawSquare();
        }*/
        particles[i].drawSprite();
        
        
    }

    timer = requestAnimationFrame(main);
}