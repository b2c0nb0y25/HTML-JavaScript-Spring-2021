//Defines variable to access the canvas properties
var canvas = document.getElementById("canvas");

//Defines the Drawing Context
var ctx = canvas.getContext('2d');

var background = new Image();
background.src = 'images/shapes.png';

background.onload = function(){
    //Square 85, 302
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '5';
    ctx.fillRect(85, 301, 100, 100)
    ctx.strokeRect(85, 301, 100, 100)

    //circle (385, 441, r = 66)
    ctx.fillStyle = '#ffff00';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = '5';
    ctx.beginPath();
    ctx.arc(385, 441, 66, 0, (2 * Math.PI), false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    
    //line (278, 549), (85, 682)

    ctx.strokeStyle = 'rgb(255, 0, 0)'
    ctx.moveTo(85, 682);
    ctx.lineTo(278, 549);
    ctx.stroke();

    //pentagon (557,308), (667, 284), (724, 380), (650, 463), (548, 420)

    ctx.fillStyle = '#ff00ff';
    ctx.strokeStyle = '#00ffff';
    ctx.beginPath();
    ctx.moveTo(557, 308);
    ctx.lineTo(667, 284);
    ctx.lineTo(724, 380);
    ctx.lineTo(650, 463);
    ctx.lineTo(548, 420);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //star (635, 496), (668, 554), (733, 567), (688, 615), (696, 681), (636, 653), (575, 681), (584, 616), (538, 567), (604, 554)

    ctx.fillStyle = '#ffff00';
    ctx.strokeStyle = 'rgb(32, 32, 32)';
    ctx.beginPath();
    ctx.moveTo(635, 496);
    ctx.lineTo(668, 554);
    ctx.lineTo(733, 567);
    ctx.lineTo(688, 615);
    ctx.lineTo(696, 681);
    ctx.lineTo(636, 653);
    ctx.lineTo(575, 681);
    ctx.lineTo(584, 616);
    ctx.lineTo(538, 567);
    ctx.lineTo(604, 554);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}