var riddles = [
    "If you eat me, my sender will eat you. What am I?",
    "How do you fit 10 horses into 9 stalls?",
    "I look flat, but I am deep. In hidden realms I shelter. Lives I take, but food I offer. At times I am beautiful. I can be calm, angry and turbulent. I have no heart, but offer pleasure as well as death. No man can own me, yet I encompass what all men must have.",
    "What always ends everything?",
    "What has only two words, but thousands of letters?",
    "What is as big as an elephant, but weighs nothing at all?",
    "How many letters are in the alphabet?",
    "How is Ron 10 years old in 1870, but only 5 years old in 1875?",
    "There was a man walking in the desert. It was an especially hot day that day. In the distance, the man suddenly saw a restaurant. He rejoiced and ran to the restaurant and immediately asked the waiter for a glass of water. Instead, the waiter pulled out a gun and pointed it at the man\"s head. The man replied with, \"thank you\". Why did the man say \"thank you\"?",
    "I am a five-letter word. I sounds the same when you remove my first letter. I sound the same when you remove my 3rd letter. I sound the same when you remove my last letter, and I sound the same when you remove all three. Which word am I?",
    "A man runs away from home. He turns left, and keeps running. After some time he turns left again and keeps running. He later turns left once more and runs back home. Who was the man in the mask?",
    "There are 6 sisters. Each sister has 1 brother. How many brothers are in the sisters family?",
    "A container without hinges, lock or a key, yet a golden treasure lies inside me. What am I?",
    "Only one color, but not one size, stuck at the bottom, yet easily flies; present in sun, but not in rain; doing no harm, and feeling no pain.",
    "First, think of the color of clouds. Next think of the color of snow. Last, think of the color of the moon. Now, what do cows drink?",
    "What can’t be burned in a fire nor drowned in water?",
    "What is half of 8? Hint: It’s not 4",
    "I can fly but I have no wings. I can cry but I have no eyes. Wherever I go darkness follows me. What am I?",
    "How is 7 different from the rest of the numbers from 1-10?",
    "If you are running a race, and you pass the person in second, what place are you in?",
    "Two men are in a desert. They both have packs on. One of the guys is dead. The guy who is alive has his pack open, the guy who is dead has his pack closed. What is in the pack?",
    "What is it a child can make that no one can ever see?",
    "What can fill an entire room without taking up any space?",
    "I no longer have eyes, but once I did see. Once I had thoughts, but now I’m white and empty. What am I?",
    "What can you hold in your right hand but never in your left hand?",
    "Poor people have it. Rich people need it. If you eat it, you’ll sick or maybe die. What is it?",
    "What is it that no one wants, but no one wants to lose?",
    "How many months have 28 days?",
    "What comes once in a minute, twice in a moment, but never in a thousand years?",
    "How do you make the number one disappear by adding to it?",
    "The answer I give is yes, but what I mean is no. What was the question?",
    "I can be written, I can be spoken, I can be exposed, I can be broken. What am I?",
    "Add two letters to me and I become shorter? What am I?",
    "From house to house I go, sometimes narrow, sometimes wide. And whether there\'s rain or snow I always stay outside. What am I?",
    "What\’s black when you get it, red when you use it, and white when you’re all through with it?"];

var riddlesLen = getLength();

var riddlesAnswers = [
    'Answer: A fish hook.',
    'Answer: [t][e][n][h][o][r][s][e][s]',
    'Answer: Ocean',
    'Answer: The letter "G"',
    'Answer: A Post Office.',
    'Answer: The shadow of an elephant.',
    'Answer: There are eleven letters in "the alphabet."',
    'Answer: Ron was born in 1880 B.C.',
    'Answer: It was a water gun.',
    'Answer: Empty, mpty, emty, emp-t, m t.',
    'Answer: The catcher. In baseball game.',
    'Answer: 1 brother. If there was 6 brothers, each sister would have 6 brothers.',
    'Answer: An egg.',
    'Answer: A shadow.',
    'Answer: Water. If the teaser worked, you guessed milk.',
    'Answer: Ice. It melts instead of burning in a fire and it floats in water.',
    'Answer: 3 (if you slice vertically) or 0 (if you slice horizontally).',
    'Answer: Cloud.',
    'Answer: 7 (seven) is the only one with two syllables.',
    'Answer: Second place.',
    'Answer: A parachute.',
    'Answer: Noise.',
    'Answer: Light.',
    'Answer: A skull.',
    'Answer: Your left hand.',
    'Answer: Nothing.',
    'Answer: A lawsuit.',
    'Answer: All 12 months!',
    'Answer: "M"',
    'Answer: Add the letter \'G\' and it becomes Gone.',
    'Answer: Do you mind?',
    'Answer: News.',
    'Answer: I\'m the word short, so if you add -er, then I literally become shorter.',
    'Answer: A Path.',
    'Answer: Charcoal.'];

var riddleNumber
function showAnswer(id) {
    document.getElementById(id).innerHTML = riddlesAnswers[riddleNumber];
}

function getRiddle(id) {
    document.getElementById(id).innerHTML = riddles[riddleNumber];
}

function nextRiddle(id1, id2, id3, id4){
    riddles.splice(riddleNumber, 1);
    riddlesAnswers.splice(riddleNumber, 1);
    riddlesLen = getLength();
    if(riddlesLen == 0){
        document.getElementById(id1).innerHTML = "Congratulations!"
        document.getElementById(id2).innerHTML = "You have seen all of the riddles!"
        document.getElementById(id3).toggleAttribute('disabled', true)
        document.getElementById(id3).style.cursor = 'not-allowed'
        document.getElementById(id4).toggleAttribute('disabled', true)
        document.getElementById(id4).style.cursor = 'not-allowed'
    }
    else{
    document.getElementById(id3).toggleAttribute('disabled', false)
    document.getElementById(id4).toggleAttribute('disabled', false)
    document.getElementById(id1).innerHTML = riddlesLen
    document.getElementById(id2).innerHTML = ''
    riddleNumber = setNumber();
    getRiddle(id1);
    }
}

function setNumber(){
    riddleNumber = Math.floor(Math.random() * riddlesLen)
    return riddleNumber;
}

function getLength(){
    riddlesLen = riddles.length;
    return riddlesLen;
}