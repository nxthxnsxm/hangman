//intial references


//assigning all the variables within HTML file into constants
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//options values for buttons

//list of all the fruits that could display
let options = {
    fruits: [
        "Apple",
        "Blueberry",
        "Mandarin",
        "Pineapple",
        "Strawberry",
        "Grapes",
        "Mango",
        "Pear",
        "Kiwi",
        "Lychee",
        "Pomegranate",
        "Watermelon",
        "Banana",
        "Avocado",
        "Lemon",
        "Cherry",
        "Plum",
        "Melon",
    ],

//list of all the animals that could display
    animals: [
        "Hedgehog",
        "Cat",
        "Monkey",
        "Wolf",
        "Snake",
        "Turtle",
        "Giraffe",
        "Panda",
        "Zebra",
        "Pig",
        "Penguin",
        "Dog",
        "Dolphin",
        "Whale",
    ],

//list of all the countries that could displayed 
    countries: [
        "Ghana",
        "Ethiopia",
        "Nigeria",
        "Niger",
        "Jamaica",
        "Grenada",
        "Togo",
        "Morocco",
        "Brazil",
        "Singapore",
        "Turkey",
        "France",
        "Italy",
        "Spain",
        "Germany",
        "Russia",
        "Croatia",
    ],
};

//count variables

let winCount = 0;
let count = 0;

let chosenWord = "";

//display option buttons
const displayOptions = () => {
    //output to user for options available; Fruits, Animals and Countries
    optionsContainer.innerHTML += `<h3>Please Select an Option</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options){
        /*depending on the users option, program will randomly choose word from the options list 
        (e.g. if user selects 'Animals', a random word will be selected from 'Animals')*/

        buttonCon.innerHTML += `<button class='options' onclick = "generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

//block all the buttons once user selects option
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");

    //if optionValue matches the button innerText then highlight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        //option buttons are disabled when user selects choice
        button.disabled = true;
    });

    //intitally hide letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    //choose random word depending on the option user chose
    chosenWord = optionArray[Math.floor(Math.random()* optionArray.length)];
    //makes chosen word all uppercase
    chosenWord = chosenWord.toUpperCase();

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    //display each element as a span - spacing the dashes
    userInputSection.innerHTML = displayItem;
};

//Initialisation Function (called when Page Loads/user presses New Game)
const initializer = () => {
    winCount = 0;
    count = 0;

    //initally erase all content and hide letters and new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //for creating letter buttons
    for (let i = 65; i < 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");

        //Number to ASCII [A-Z]
        button.innerText = String.fromCharCode(i);

        //character button click
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");

            //if array contains clicked value, replace the matched dash with a letter, else draw on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {

                    //if character in array is the same as clicked button
                    if(char === button.innerText) {

                        //replace dash with a letter
                        dashes[index].innerText = char;

                        //increment counter for each correct character
                        winCount += 1;

                        //if winCount equals word length
                        if (winCount == charArray.length) {
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                            //block buttons
                            blocker();
                        }
                    }
                });

            } else {
                //lose count everytime user clicks incorrect character
                count += 1;

                //for drawing man
                drawMan(count);
                
                //count = 6 because head, body, left arm, right arm, left leg, right leg
                if (count == 6) {
                    resultText.innerHTML = `<h2 class='lose-msg'>Game Over!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            //disable clicked button
            button.disabled = true;  
        });
        letterContainer.append(button);
    }

    displayOptions();
    //call to canvasCreator (for clearing previous canvas and creating initial canvas)

    let { initialDrawing } = canvasCreator();

    //initalDrawing would draw the frame all over again
    initialDrawing();
};

//Canvas 
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    //color of the lines for the hangman diagram are the colour black
    context.strokeStyle = "#000";
    //line of hangman diagram is thickness of 2 pixels
    context.lineWidth = 2;

    //for drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70,30,10,0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
            drawLine(70, 80, 90, 110);
    };


    //initial frame 
    const initialDrawing = () => {

        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        //bottom line
        drawLine(10, 130, 130, 130);

        //left line
        drawLine(10, 10, 10, 131);

        //top line
        drawLine(10, 10, 70, 10);

        //small top line
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};


//draw the hangman
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {

        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
            default:
            break;
    }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;