const startBtn = document.querySelector("#start-btn")
const instructionsBtn = document.querySelector("#instructions-btn")
const titleCard = document.querySelector("#title-card")
const gameCard = document.querySelector("#game-card")
const promptDiv = document.querySelector("#prompt-div")
const choicesDiv = document.querySelector("#choices-div")
const tooltip = document.querySelector("#tooltip")
const feedbackDiv = document.querySelector("#feedback-div")
const limbCount = document.querySelector("#limb-count")

const choice1 = document.querySelector("#choice-1")
const choice2 = document.querySelector("#choice-2")
const choice3 = document.querySelector("#choice-3")
const choice4 = document.querySelector("#choice-4")

// game state variable
let gameEnd = false
// start limbsRemaining for loss function
let limbsRemaining = 5

const taunts = [
    "*CHOMP* Looks like you'll be hopping away from here on one foot soon enough!",
    "Maybe your brain is better suited for brewing potions than solving riddles!",
    "*crunching and slurrping noises*",
    "I've seen rocks with more wit than you!",
    "Perhaps you should consider a career in limb donation!",
    "I'm beginning to think your master sent you here as a sacrifice!",
    "If I had a gold piece for every wrong answer you gave, I could retire!",
    "Looks like dinner will be served in bite-sized portions!",
    "I haven't had a good laugh like this in ages, thanks for entertainment!",
    "Maybe your fingers will be tastier than your brain!",
    "I hope you're better at regrowing limbs than you are solving riddles!"
]

const trolls = {
    phrases: []
}

// array of riddle objects
const riddles = [
    {
        prompt: "You measure my life in hours and I serve you by expiring. I'm quick when I'm thin and slow when I'm fat. The wind is my enemy. What am I",
        choices: ["Candle","Hourglass","Caterpillar","Battery"],
        answer: "Candle"
    },
    {
        prompt: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but I consume all that surrounds me. What am I?",
        choices: ["Rust","Crystal","Fire","River"],
        answer: "Fire"
    },
    {
        prompt: "I am light as a feather, yet the strongest man cannot hold me for much more than a moment. What am I?",
        choices: ["Thought","Time","Idea","Breath"],
        answer: "Breath"
    },
    {
        prompt: "I have towns without people, forests without trees, and rivers without water. What am I?",
        choices: ["Skyline","Map","Desert","Dream"],
        answer: "Map"
    },
    {
        prompt: "You see a boat filled with people. It has not sunk, but when you look again, you don't see a single person on the boat. Why?",
        choices: ["They went below deck","They jumped overboard","They are all married","Sharks."],
        answer: "They are all married"
    },
    {
        prompt: "Your mother is an orc. Your father is a dwarf. What are you?",
        choices: ["Orc with Dwarfism","A New Hybrid","Half-Elf","A Dork"],
        answer: "A Dork"
    },
    {
        prompt: "They call me the king. I have the eyes, hiss, and fangs of a snake, but have no scales or venom. What am I?",
        choices: ["Lizard","Naga","Tarantula","Cat"],
        answer: "Cat"
    },
    {
        prompt: "I have a tail, and a head, but no legs. I am probably with you now. What am I?",
        choices: ["A Comet","A Snake","A Merfolk","A Coin"],
        answer: "A Coin"
    },
    {
        prompt: "You do not need a 'DO NOT ENTER' sign for this room.",
        choices: ["Dungeon","Privy","Crypt","Mushroom"],
        answer: "Mushroom"
    },
    {
        prompt: "I am an eye set in a blue face. My gaze feeds the world. If I go blind so does the world.",
        choices: ["Blue Eyes White Dragon","Eye of Sauron","Palantir","The Sun"],
        answer: "The Sun"
    },
    {
        prompt: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
        choices: ["An Echo", "A Ghost", "A Whistle", "Thunder"],
        answer: "An Echo"
    },
    {
        prompt: "I am taken from a mine, and shut up in a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
        choices: ["Coal", "A Diamond", "Gold", "Pencil Lead"],
        answer: "Pencil Lead"
    },
    {
        prompt: "What has roots as nobody sees, is taller than trees, up, up it goes, and yet never grows?",
        choices: ["A Cloud", "A Mountain", "A Volcano", "A Beanstalk"],
        answer: "A Mountain"
    },
    {
        prompt: "The more you take, the more you leave behind. What am I?",
        choices: ["Footsteps", "Time", "Memories", "Sand"],
        answer: "Footsteps"
    },
    {
        prompt: "I am taken from a specific type of tree. People use me to send secret messages. What am I?",
        choices: ["Bark", "A Leaf", "A Seed", "Ink"],
        answer: "Ink"
    },
    {
        prompt: "I am filled with keys but can't open locks. What am I?",
        choices: ["A Treasure Chest", "A Piano", "A Keyboard", "A Keyring"],
        answer: "A Keyboard"
    },
    {
        prompt: "What has a heart that doesn't beat?",
        choices: ["A Stone", "A Clock", "A Tree", "An Artichoke"],
        answer: "An Artichoke"
    },
    {
        prompt: "I am always in front of you but can never be seen. What am I?",
        choices: ["The Future", "A Mirror", "A Reflection", "A Shadow"],
        answer: "The Future"
    },
    {
        prompt: "What comes once in a minute, twice in a moment, but never in a thousand years?",
        choices: ["A Comet", "An Eclipse", "The Letter M", "A Leap Year"],
        answer: "The Letter M"
    },
    {
        prompt: "I am a word of letters three, add two and fewer there will be. What am I?",
        choices: ["Few", "One", "Trio", "Ten"],
        answer: "Few"
    }
]
// initialize arrays from beginning & keep riddlesAnswered for win function
let riddlesAnswered = 0
let currentRiddleIndex = 0
let activeRiddle = riddles[currentRiddleIndex]


startBtn.addEventListener("click", () => {
    initGame()
    // shuffle riddles array
    shuffle(riddles)
    // display first riddle
    displayRiddle(riddles[0])
})

function initGame() {
    // hide title card & display the others
    hide(titleCard)
    showFlex(gameCard)
    showFlex(promptDiv)
    showGrid(choicesDiv)
    // play background music
    backgroundMusic.volume = 0.045
    backgroundMusic.play()
}

function renderRiddle(riddle) {
    promptDiv.innerText = riddle.prompt;

  const randomizedChoices = [];

  const originalChoices = [...riddle.choices];

  while (originalChoices.length > 0) {
    const randomIndex = Math.floor(Math.random() * originalChoices.length);
    randomizedChoices.push(originalChoices.splice(randomIndex, 1)[0]);
  }

  let choiceBtns = document.querySelectorAll(".choice-btn")

  randomizedChoices.forEach((choice, i) => {
    choiceBtns[i].innerText = choice;
  });
}

function endGame() {
    if (gameEnd) {
        if (limbsRemaining > 0) {
            playAudio(winAudio);
            promptDiv.innerText = "You won!!"
            promptDiv.classList.toggle("win-text")
        } else {
            playAudio(failAudio);
            promptDiv.innerText = "You lose! The Bridge Troll's Toll cost ya everything. Good luck with yer next life."
            promptDiv.classList.toggle("lose-text")

            // Create reset button
            const resetButton = document.createElement("button")
            resetButton.innerText = "Reset"
            feedbackDiv.append(resetButton)

            resetButton.addEventListener("click", () => {
                feedbackDiv.removeChild(resetButton)
                resetGame()
            })
        }
    }
}

function resetGame() {
    // Reset display
    showFlex(titleCard)
    hide(gameCard)
    hide(promptDiv)
    hide(choicesDiv)
    hide(feedbackDiv)

    // Reset state
    currentRiddleIndex = 0
    limbsRemaining = 5
    limbCount.innerText = 5
    promptDiv.className = "prompt-div"

    // Reset stickfigure
    stickLeftArm.className = "left-arm";
    stickRightArm.className = "right-arm";
    stickLeftLeg.className = "left-leg";
    stickRightLeg.className = "right-leg";
    stickHead.style.animation = "rock 1s alternate infinite ease-in-out"

    // Reset audio
    stopAudio(winAudio);
    stopAudio(failAudio);
}

const showFlex = (element) => {element.style.display = "flex"}

const showGrid = (element) => {element.style.display = "grid"}

const hide = (element) => {element.style.display = "none"}

// Audio initialization
const painAudio = new Audio()
    painAudio.src = document.querySelector("#pain-sound").src
const backgroundMusic = new Audio()
    backgroundMusic.src = document.querySelector("#elevator-music").src
const winAudio = new Audio()
    winAudio.src = document.querySelector("#victory-music").src
const failAudio = new Audio()
    failAudio.src = document.querySelector("#fail-music").src

// Audio helpers
function playAudio(audio) {
    audio.volume = 0.075;
    audio.play();
}

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

// listeners for each answer button click
choice1.addEventListener("mousedown", handleChoiceClick)
choice2.addEventListener("mousedown", handleChoiceClick)
choice3.addEventListener("mousedown", handleChoiceClick)
choice4.addEventListener("mousedown", handleChoiceClick)

// function to shuffle an array
function shuffle(array) {
    let currentIndex = array.length, randomIndex

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
}

// function for each click
function handleChoiceClick(e) {
    const userChoice = e.target.innerText;
    activeRiddle = riddles[currentRiddleIndex]
    const currentRiddleAnswer = activeRiddle.answer
    // create a checkAnswer function
    checkAnswer(userChoice, currentRiddleAnswer)
}

function checkAnswer(userChoice, currentRiddleAnswer) {
    // if user selects correct answer
    if (userChoice === currentRiddleAnswer) {
        // create a positive feedback message
        hide(choicesDiv)
        showFlex(feedbackDiv)
        feedbackDiv.innerText = "Gud jorb, we'll see if you can do it again..."
        // advance to next question in array
        currentRiddleIndex++
        // append button to new feedback div
        const nextRiddleBtn = document.createElement("button")
        nextRiddleBtn.id = "next-riddle-btn"
        feedbackDiv.append(nextRiddleBtn)
        // this riddlesAnswered conditional changes length of game
        if (riddlesAnswered === 6) { // end of game condition
            gameEnd = true
            gameOver()
            // change button to reset game instead of advance question
            nextRiddleBtn.innerText = "Reset"
            nextRiddleBtn.addEventListener("click", () => {
                feedbackDiv.removeChild(nextRiddleBtn)
                resetGame()
            })
        } else {    //  proceed to next riddle
            nextRiddleBtn.innerText = "Next Riddle"
            nextRiddleBtn.addEventListener("click", () => {
                hide(feedbackDiv)
                displayRiddle(riddles[currentRiddleIndex])
                feedbackDiv.removeChild(nextRiddleBtn)
            })
        }
    } else {
        // if user selects wrong answer, and still has limbs
        if (limbsRemaining > 0) {
            // select a random phrase to troll user
            const trollingIndex = Math.floor(Math.random() * taunts.length)
            const taunt = document.createElement("p")
            taunt.className = "troll-phrase"
            taunt.innerText = taunts[trollingIndex]
            // replace current troll phrase with new troll phrase after consecutive wrong answers
            if (promptDiv.lastChild.className === "troll-phrase") {
                promptDiv.lastChild.innerText = taunt.innerText;
            } else {
                // append new troll phrase to prompt
                promptDiv.appendChild(taunt)
            }
            removeLimb()
        } else {
            // user has no more limbs, game over
            gameEnd = true
            gameOver()
        }
    }
}

// function to display riddle from 
function displayRiddle(riddle) {
    riddlesAnswered++

    renderRiddle(riddle)

    showGrid(choicesDiv)

    let choiceBtns = document.querySelectorAll(".choice-btn")
}

// stickfigure divs
const stickHead = document.querySelector(".head")
const stickLeftArm = document.querySelector(".left-arm")
const stickRightArm = document.querySelector(".right-arm")
const stickLeftLeg = document.querySelector(".left-leg")
const stickRightLeg = document.querySelector(".right-leg")

// Remove limb from DOM
function removeLimbFromDOM(limb) {
    if (limb === 'leftArm') {
        stickLeftArm.classList.remove("left-arm");
    } else if (limb === 'rightArm') {
        stickRightArm.classList.remove("right-arm");
    } else if (limb === 'leftLeg') {
        stickLeftLeg.classList.remove("left-leg");
    } else if (limb === 'rightLeg') {
        stickRightLeg.classList.remove("right-leg");
    } else if (limb === 'head') {
        stickHead.style.animation = "none";
    }
}

// Update limbs remaining
const updateLimbsRemaining = (count) => {limbCount.innerText = count}

// Get next limb
function getNextLimb() {
    if (limbsRemaining === 4) {
        return 'leftArm';
    } else if (limbsRemaining === 3) {
        return 'rightArm';
    } else if (limbsRemaining === 2) {
        return 'leftLeg';
    } else if (limbsRemaining === 1) {
        return 'rightLeg';
    } else {
        return 'head';
    }
}

// function to decrement Hump's limbs on wrong answers.
function removeLimb() {
    limbsRemaining--;

    const nextLimb = getNextLimb();

    playAudio(painAudio);

    removeLimbFromDOM(nextLimb);

    updateLimbsRemaining(limbsRemaining);
    
    if (limbsRemaining > 0) { // change the limb count on screen
        // update displayed count
        updateLimbsRemaining(limbsRemaining);
    } else {
        // No limbs left, game over
        gameEnd = true        
        gameOver()
    }
}

// gameover screens, both winner & loser
function gameOver() {
    stopAudio(backgroundMusic);

    hide(choicesDiv)
    showFlex(feedbackDiv)

    endGame();
}
