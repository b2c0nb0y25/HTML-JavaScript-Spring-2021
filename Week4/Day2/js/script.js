//Defines variable to access the canvas properties
var canvas = document.getElementById("canvas");

//Defines the Drawing Context
var ctx = canvas.getContext('2d');

var timer = requestAnimationFrame(main);

var x = 1;

var background = new Image();
background.src = 'images/1061.jpg';
background.onload = function(){
    main();
}

var lonksprite2 = new Image();
lonksprite2.src = 'images/lonksprite2.png';
lonksprite2.onload = function(){
    main();
}

function main(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw images
    ctx.drawImage(background, 0, 0, 800, 600);
    ctx.drawImage(lonksprite2, x, canvas.height/2, 89, 70.7)
    console.log('working');

    //update position
    x += 100;

    if(x > canvas.width + 20){
        x = -100;
    }

    timer = requestAnimationFrame(main)
}