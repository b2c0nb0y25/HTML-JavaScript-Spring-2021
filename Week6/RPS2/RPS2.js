var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var timer = requestAnimationFrame(main);

var gameStates = [];
var currentState = 0;
var xPos = 10;
var gameOver = true;

var pHp = 20;
var cHp = 20;

var background = new Image();
background.src = 'images/Pokemon-Red-5.jpg'

//setup keypresses
document.addEventListener('keydown', keyPressDown);
document.addEventListener('keyup', keyPressUp);

//array for buttons
var btn = document.querySelectorAll('button')
//assign event listeners to the buttons
btn[0].addEventListener('click', function (e) { playGame(0) })
btn[1].addEventListener('click', function (e) { playGame(1) })
btn[2].addEventListener('click', function (e) { playGame(2) })
//Game States for Finite State Machine (FSM)
gameStates[0] = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'center';
    ctx.font = '60px Arial';
    ctx.fillText('Untitled HTML Game', canvas.width / 2, canvas.height / 2 - 25);
    ctx.font = '20px Arial';
    ctx.fillText('(Press Spacebar to Start)', canvas.width / 2, (canvas.height / 2) + 25);
}

gameStates[1] = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, 800, 600);
    main();
}

gameStates[2] = function () {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '60px Arial';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 25);
    ctx.font = '20px Arial';
    ctx.fillText('(Press Spacebar for Main Menu)', canvas.width / 2, (canvas.height / 2) + 25);
}

function main() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Must add parentheses to functions called in this way
    gameStates[currentState]();

    //The main function
    timer = requestAnimationFrame(main);
}

function keyPressDown(e) {
    console.log(e.keyCode);

}

function keyPressUp(e) {
    console.log(e.keyCode);
    if (gameOver == true) {
        if (e.keyCode == 32) {
            changeState();
        }
    }
}

function changeState() {
    console.log(currentState);
    if (currentState >= gameStates.length - 1) {
        currentState = 0;
    } else {
        currentState++;
    }
}

var crit = false;

function damage(){
    if(Math.ceil(Math.random() * 20) == 20){
        return 2 * Math.ceil(Math.random() * 3);
    }else
        return Math.ceil(Math.random() * 3);
}

function playGame(playerChoice) {
    if (currentState == 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //generate cpu choice
        var cpuChoice = Math.floor(Math.random() * (2.99))

        //example of a switch case
        switch (playerChoice) {
            case 0:
                if (cpuChoice == 0) {
                    //its a tie
                    ctx.fillText('You chose: ROCK', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: ROCK', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('NO WINNER! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Rock', 'Rock', 'It\'s a tie')
                } else if (cpuChoice == 1) {
                    //cpu wins
                    pHp -= damage();
                    ctx.fillText('You chose: ROCK', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: PAPER', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('CPU Wins! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Rock', 'Paper', 'Computer Wins')
                } else {
                    //player wins
                    cHp -= damage();
                    ctx.fillText('You chose: ROCK', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: SCISSORS', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('PLAYER Wins! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Rock', 'Scissors', 'YOU ARE WIN')
                }
                break;

            case 1:
                if (cpuChoice == 0) {
                    //player wins
                    cHp -= damage()
                    ctx.fillText('You chose: PAPER', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: ROCK', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('PLAYER Wins! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Paper', 'Rock', 'YOU ARE WIN')
                } else if (cpuChoice == 1) {
                    //it's a tie
                    ctx.fillText('You chose: PAPER', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: PAPER', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('NO WINNER! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Paper', 'Paper', 'It\'s a tie')
                } else {
                    //player wins
                    pHp -= damage();
                    ctx.fillText('You chose: PAPER', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: SCISSORS', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('CPU Wins', canvas.width / 2, canvas.height / 2 + 60);
                    //showResults('Paper', 'Scissors', 'Computer Wins')
                }
                break;

            case 2:
                if (cpuChoice == 0) {
                    //its a tie
                    pHp -= damage();
                    ctx.fillText('You chose: SCISSORS', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: ROCK', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('CPU Wins! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Scissors', 'Rock', 'Computer Wins')
                } else if (cpuChoice == 1) {
                    //cpu wins
                    cHp -= damage();
                    ctx.fillText('You chose: SCISSORS', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: PAPER', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('PLAYER Wins! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Scissors', 'Paper', 'YOU ARE WIN')
                } else {
                    //player wins
                    ctx.fillText('You chose: SCISSORS', canvas.width / 2, canvas.height / 2 - 60);
                    ctx.fillText('They chose: SCISSORS', canvas.width / 2, canvas.height / 2);
                    ctx.fillText('NO WINNER! Your HP is: ' + pHp, canvas.width / 2, canvas.height / 2 + 60);
                    ctx.fillText('Opponent\'s HP is: ' + cHp, canvas.width / 2, canvas.height / 2 + 100);
                    //showResults('Scissors', 'Scissors', 'It\'s a tie')
                }
                break;
        }
    }

}