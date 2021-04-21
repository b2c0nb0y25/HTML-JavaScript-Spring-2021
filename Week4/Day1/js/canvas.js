//Defines variable to access the canvas properties
var canvas = document.getElementById("canvas");

//Defines the Drawing Context
var ctx = canvas.getContext('2d');

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
ctx.arc(400, 300, 50, 0, (3 * Math.PI/2), false);
ctx.lineTo(400, 300)
ctx.closePath();
ctx.fill();