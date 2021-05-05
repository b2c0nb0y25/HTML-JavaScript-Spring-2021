var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var timer = requestAnimationFrame(main);

var startFuel = Math.round(Math.random() * (200 - canvas.width) + canvas.width);

function GameObject(){
    this.fuel = startFuel;
}