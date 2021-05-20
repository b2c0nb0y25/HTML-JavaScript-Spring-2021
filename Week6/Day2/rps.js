var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.textAlign = 'center';
ctx.font = '60px Arial';
ctx.fillStyle = 'blue';
ctx.strokeStyle = 'red'

//array of choices
var rps = ['Rock', 'Paper', 'Scissors'];

//array for buttons
var btn = document.querySelectorAll('button')
//assign event listeners to the buttons
btn[0].addEventListener('click', function(e){playGame(0)})
btn[1].addEventListener('click', function(e){playGame(1)})
btn[2].addEventListener('click', function(e){playGame(2)})

function playGame(playerChoice){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //generate cpu choice
    var cpuChoice = Math.floor(Math.random() * (2.99))

    //example of a switch case
    switch(playerChoice){
        case 0:
            if(cpuChoice == 0){
                //its a tie
                ctx.fillText('You chose: ROCK', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: ROCK', canvas.width/2, canvas.height/2);
                ctx.fillText('NO WINNER', canvas.width/2, canvas.height/2 + 60);
                //showResults('Rock', 'Rock', 'It\'s a tie')
            } else if(cpuChoice == 1){
                //cpu wins
                ctx.fillText('You chose: ROCK', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: PAPER', canvas.width/2, canvas.height/2);
                ctx.fillText('CPU Wins', canvas.width/2, canvas.height/2 + 60);
                //showResults('Rock', 'Paper', 'Computer Wins')
            } else {
                //player wins
                ctx.fillText('You chose: ROCK', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: SCISSORS', canvas.width/2, canvas.height/2);
                ctx.fillText('PLAYER Wins', canvas.width/2, canvas.height/2 + 60);
                //showResults('Rock', 'Scissors', 'YOU ARE WIN')
            }
            break;
        
        case 1:
            if(cpuChoice == 0){
                //player wins
                ctx.fillText('You chose: PAPER', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: ROCK', canvas.width/2, canvas.height/2);
                ctx.fillText('PLAYER Wins', canvas.width/2, canvas.height/2 + 60);
                //showResults('Paper', 'Rock', 'YOU ARE WIN')
            } else if(cpuChoice == 1){
                //it's a tie
                ctx.fillText('You chose: PAPER', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: PAPER', canvas.width/2, canvas.height/2);
                ctx.fillText('NO WINNER', canvas.width/2, canvas.height/2 + 60);
                //showResults('Paper', 'Paper', 'It\'s a tie')
            } else {
                //player wins
                ctx.fillText('You chose: PAPER', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: SCISSORS', canvas.width/2, canvas.height/2);
                ctx.fillText('CPU Wins', canvas.width/2, canvas.height/2 + 60);
                //showResults('Paper', 'Scissors', 'Computer Wins')
            }
            break;

        case 2:
            if(cpuChoice == 0){
                //its a tie
                ctx.fillText('You chose: SCISSORS', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: ROCK', canvas.width/2, canvas.height/2);
                ctx.fillText('CPU Wins', canvas.width/2, canvas.height/2 + 60);
                //showResults('Scissors', 'Rock', 'Computer Wins')
            } else if(cpuChoice == 1){
                //cpu wins
                ctx.fillText('You chose: SCISSORS', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: PAPER', canvas.width/2, canvas.height/2);
                ctx.fillText('PLAYER Wins', canvas.width/2, canvas.height/2 + 60);
                //showResults('Scissors', 'Paper', 'YOU ARE WIN')
            } else {
                //player wins
                ctx.fillText('You chose: SCISSORS', canvas.width/2, canvas.height/2 - 60);
                ctx.fillText('They chose: SCISSORS', canvas.width/2, canvas.height/2);
                ctx.fillText('NO WINNER', canvas.width/2, canvas.height/2 + 60);
                //showResults('Scissors', 'Scissors', 'It\'s a tie')
            }
            break;
    }
}
