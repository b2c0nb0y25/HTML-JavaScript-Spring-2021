//Defines variable to access the canvas properties
var canvas = document.getElementById("canvas");

//Defines the Drawing Context
var ctx = canvas.getContext('2d');



var background = new Image();
background.src = 'images/1061.jpg'

//Call back function loads image and draws it on the canvas
background.onload = function () {
    ctx.drawImage(background, 0, 0, 800, 600)
    //Draw a rectangle

    ctx.fillStyle = '#002840';
    ctx.strokeStyle = '#ffbe5f';
    ctx.lineWidth = '5';
    ctx.fillRect(30, 30, 100, 100);
    ctx.strokeRect(350, 250, 100, 100);

    //Draw a line

    ctx.moveTo(0, 0);
    ctx.lineTo(800, 600);
    ctx.stroke();

    ctx.moveTo(800, 0);
    ctx.lineTo(0, 600);
    ctx.stroke();

    //Draw a circle
    //ctx.arc(x, y, radius, startAngle, endAngle, isCounterClockwise?)
    ctx.beginPath();
    ctx.arc(400, 300, 50, 0, (3 * Math.PI / 2), false);
    ctx.lineTo(400, 300)
    ctx.closePath();
    ctx.fill();

    //draw a shape

    ctx.fillStyle = '#5578f2';
    ctx.strokeStyle = '#2f8755';
    ctx.lineWidth = '50'
    ctx.beginPath();
    ctx.moveTo(650, 100);
    ctx.lineTo(700, 145);
    ctx.lineTo(675, 200);
    ctx.lineTo(625, 200);
    ctx.lineTo(600, 145);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //draw an image to the canvas

    //creates an instance of the image
    var lonk1 = new Image();

    //links source to image
    lonk1.src = 'images/lonksprite2.png';

    //lonksprite.addEventListener(onload, loadimage)

    lonk1.onload = function () {
        ctx.drawImage(lonk1, 600, 300, 89, 70);
    }
}