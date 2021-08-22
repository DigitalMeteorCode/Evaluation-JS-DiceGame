//Game initialisation
newGame();

//Declaring const and let
const roll = document.getElementById("roll");
const hold = document.getElementById("hold");
const newGameButton = document.getElementById("newGameButton");
const closeModal = document.getElementById("modalClose");

let modalVictory = document.getElementById("modal");
let victoryMsg = document.getElementById("victoryMessage");
let diceImage = document.getElementById("dice");
let diceNumber = {
    1: "img/Dice1.png",
    2: "img/Dice2.png" ,
    3: "img/Dice3.png" ,
    4: "img/Dice4.png" ,
    5: "img/Dice5.png" ,
    6: "img/Dice6.png"
  }

//Game initialisation function
function newGame () {
    console.log ("New game launched");
    globalP1 = 0;
    document.getElementById("globalP1").innerHTML = globalP1;
    globalP2 = 0;
    document.getElementById("globalP2").innerHTML = globalP2;
    currentP1 = 0;
    document.getElementById("currentP1").innerHTML = currentP1
    currentP2 = 0;
    document.getElementById("currentP2").innerHTML = currentP2;
    diceScore = 0;
    player = 1;
    playerActive();
}

//Active player function
function playerActive(){
    let p1 = document.getElementById("p1");
    let p2 = document.getElementById("p2");
    let bgColor = document.getElementById("bgColor");
    if ((player == 1)&&(window.innerWidth>1024)) {
        p1.style.fontWeight = 'bolder';
        p2.style.fontWeight = 'normal';
        bgColor.setAttribute("style", "background-image:linear-gradient(to right, #EDEFF2, #EDEFF2 50%, #ffffff 50%, #ffffff);");
    }
    else if ((player == 1)&&(window.innerWidth<1024)) {
        p1.style.fontWeight = 'bolder';
        p2.style.fontWeight = 'normal';
        bgColor.setAttribute("style", "background-image:linear-gradient(to bottom, #EDEFF2, #EDEFF2 50%, #ffffff 50%, #ffffff);");
    }
    else if ((player == 2)&&(window.innerWidth>1024)) {
        p2.style.fontWeight = 'bold';
        p1.style.fontWeight = 'normal';
        bgColor.setAttribute("style", "background-image:linear-gradient(to left, #EDEFF2, #EDEFF2 50%, #ffffff 50%, #ffffff);");
    }
    else {
        p2.style.fontWeight = 'bold';
        p1.style.fontWeight = 'normal';
        bgColor.setAttribute("style", "background-image:linear-gradient(to top, #EDEFF2, #EDEFF2 50%, #ffffff 50%, #ffffff);");
    }
}

//Rolling dice function
function rollDice(){
    diceImage.classList.add("dice_animation");
    setTimeout(function () {
        diceImage.classList.remove("dice_animation");
   },500);
    diceScore = Math.floor(Math.random() * 6) + 1;
    diceImage.src = diceNumber[diceScore];

    if ((player == 1)&&(diceScore != 1)) {
        currentP1 = currentP1 + diceScore;
        document.getElementById("currentP1").innerHTML = currentP1;
    }
    else if ((player == 1)&&(diceScore == 1)) {
        currentP1 = 0;
        document.getElementById("currentP1").innerHTML = currentP1;
        player = 2;
        playerActive();
    }
    else if ((player == 2)&&(diceScore != 1)) {
        currentP2 = currentP2 + diceScore;
        document.getElementById("currentP2").innerHTML = currentP2;
    }
    else {
        currentP2 = 0;
        document.getElementById("currentP2").innerHTML = currentP2;
        player = 1;
        playerActive();
    }
}

//Holding score function 
function holdScore(){
    if ((player == 1)&&(globalP1+currentP1<100)){
        globalP1 = globalP1 + currentP1;
        currentP1 = 0;
        document.getElementById("currentP1").innerHTML = currentP1;
        document.getElementById("globalP1").innerHTML = globalP1;
        player = 2;
        playerActive();
    }
    else if ((player == 1)&&(globalP1+currentP1>=100)){
        modalVictory.style.display = "block";
        victoryMsg.innerHTML = "PLAYER ONE WINS";
    }
    else if ((player == 2)&&(globalP2+currentP2<100)){
        globalP2 = globalP2 + currentP2;
        currentP2 = 0;
        document.getElementById("currentP2").innerHTML = currentP2;
        document.getElementById("globalP2").innerHTML = globalP2;
        player = 1;
        playerActive();
    }
    else if ((player == 2)&&(globalP2+currentP2>=100)){
        modalVictory.style.display = "block";
        victoryMsg.innerHTML = "PLAYER TWO WINS";
    }
}

//Closing victory modal function
function close(){
    victoryMsg.innerHTML = "";
    modalVictory.style.display = "none";
    console.log("close");
    newGame();
}

//Buttons event listening
newGameButton.addEventListener('click', newGame);
roll.addEventListener('click', rollDice);
hold.addEventListener('click', holdScore);
closeModal.addEventListener ('click', close);