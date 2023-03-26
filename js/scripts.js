console.log("welcome to the bridge troll toll project")

const startBtn = document.querySelector("#start-btn")
const instructionsBtn = document.querySelector("#instructions-btn")
const titleCard = document.querySelector("#title-card")
const gameCard = document.querySelector("#game-card")
const promptDiv = document.querySelector("#prompt-div")
const choicesDiv = document.querySelector("#choices-div")
const tooltip = document.querySelector("#tooltip")
const feedbackDiv = document.querySelector("#feedback-div")
const limbCount = document.querySelector("#limb-count")
const painAudio = new Audio()
    painAudio.src = document.querySelector("#pain-sound").src
const backgroundMusic = new Audio()
    backgroundMusic.src = document.querySelector("#elevator-music").src
const winAudio = new Audio()
    winAudio.src = document.querySelector("#victory-music").src
const failAudio = new Audio()
    failAudio.src = document.querySelector("#fail-music").src

const choice1 = document.querySelector("#choice-1")
const choice2 = document.querySelector("#choice-2")
const choice3 = document.querySelector("#choice-3")
const choice4 = document.querySelector("#choice-4")

// game state variable
let jobsDone = false
// start limbCountVar for loss function
let limbCountVar = 5

const trollingPhrases = [
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
]
// initialize arrays from beginning & keep riddleCount for win function
let riddleCount = 0
let riddlesIndex = 0
let currentRiddle = riddles[riddlesIndex]


startBtn.addEventListener("click", () => {
    // hide title card & display the others
    titleCard.style.display = "none"
    gameCard.style.display = "flex"
    promptDiv.style.display = "flex"
    choicesDiv.style.display = "grid"
    // play background music
    backgroundMusic.volume = 0.045
    backgroundMusic.play()
    // display first riddle
    displayRiddle(riddles[0])
})

// listeners for each answer button click
choice1.addEventListener("mousedown", handleChoiceClick)
choice2.addEventListener("mousedown", handleChoiceClick)
choice3.addEventListener("mousedown", handleChoiceClick)
choice4.addEventListener("mousedown", handleChoiceClick)

// function for each click
function handleChoiceClick(e) {
    const userChoice = e.target.innerText;
    currentRiddle = riddles[riddlesIndex]
    const currentRiddleAnswer = currentRiddle.answer
    // console.log("you clicked:", userChoice, "answer", currentRiddleAnswer)
    // create a checkAnswer function
    checkAnswer(userChoice, currentRiddleAnswer)
}

function checkAnswer(userChoice, currentRiddleAnswer) {
    // if user selects correct answer
    if (userChoice === currentRiddleAnswer) {
        // create a positive feedback message
        choicesDiv.style.display = "none"
        feedbackDiv.style.display = "flex"
        feedbackDiv.innerText = "Gud jorb, we'll see if you can do it again..."
        // advance to next question in array
        riddlesIndex++
        // append button to new feedback div
        const nextRiddleBtn = document.createElement("button")
        nextRiddleBtn.id = "next-riddle-btn"
        feedbackDiv.append(nextRiddleBtn)
        // this riddleCount conditional changes length of game
        if (riddleCount === 6) { // end of game condition
            jobsDone = true
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
                feedbackDiv.style.display = "none"
                displayRiddle(riddles[riddlesIndex])
                feedbackDiv.removeChild(nextRiddleBtn)
            })
        }
    } else {
        // if user selects wrong answer, and still has limbs
        if (limbCountVar > 0) {
            // select a random phrase to troll user
            const trollingIndex = Math.floor(Math.random() * trollingPhrases.length)
            const trollPhrase = document.createElement("p")
            trollPhrase.className = "troll-phrase"
            trollPhrase.innerText = trollingPhrases[trollingIndex]
            // replace current troll phrase with new troll phrase after consecutive wrong answers
            if (promptDiv.lastChild.className === "troll-phrase") {
                promptDiv.lastChild.innerText = trollPhrase.innerText;
            } else {
                // append new troll phrase to prompt
                promptDiv.appendChild(trollPhrase)
            }
            removeLimb()
        } else {
            // user has no more limbs, game over
            jobsDone = true
            gameOver()
        }
    }
}
// function to display riddle from 
function displayRiddle(riddle) {
    riddleCount++
    promptDiv.innerText = riddle.prompt
    choicesDiv.style.display = "grid"
    let choiceBtns = document.querySelectorAll(".choice-btn")
    // console.log(riddle.choices)
    //  use the sort method w/ random number between -.5 & .5 to determine order
    const randomizedChoices = riddle.choices.sort(() => Math.random() - 0.5)
    // console.log(randomizedChoices)
    // assign each answer to a button
    randomizedChoices.forEach((choice, i) => {
        choiceBtns[i].innerText = choice
    })
}
// stickfigure divs
const stickHead = document.querySelector(".head")
const stickLeftArm = document.querySelector(".left-arm")
const stickRightArm = document.querySelector(".right-arm")
const stickLeftLeg = document.querySelector(".left-leg")
const stickRightLeg = document.querySelector(".right-leg")

// function to decrement Hump's limbs on wrong answers.
function removeLimb() {
    limbCountVar -= 1
    painAudio.volume = 0.035;
    painAudio.play();
    switch (limbCountVar) {
        case 4:
            stickLeftArm.classList.remove("left-arm");
            break;
        case 3:
            stickRightArm.classList.remove("right-arm");
            break;
        case 2:
            stickLeftLeg.classList.remove("left-leg");
            break;
        case 1:
            stickRightLeg.classList.remove("right-leg");
            break;
        default:
            stickHead.style.animation = "none"
            break;
    }
    if (limbCountVar > 0) { // change the limb count on screen
        limbCount.innerText = limbCountVar        
    } else {
        limbCount.innerText = limbCountVar
        jobsDone = true        
        gameOver()
    }
}

// gameover screens, both winner & loser
function gameOver() {
    backgroundMusic.pause()
    backgroundMusic.currentTime = 0
    choicesDiv.style.display = "none"
    feedbackDiv.style.display = "flex"
    if (jobsDone = true) {
        if (limbCountVar > 0) {
            winAudio.volume = .075
            winAudio.play()
            promptDiv.innerText = "You won! You paid the Troll's Toll with change leftover- time to celebrate!"
            promptDiv.classList.toggle("win-text")
            
        } else {
            failAudio.volume = .025
            failAudio.play()
            promptDiv.innerText = "You lose! The Bridge Troll's Toll cost you everything. Good luck with your next life."
            promptDiv.classList.toggle("lose-text")
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
// reset everything
function resetGame() {
    console.log("somebody clicked reset")
    titleCard.style.display = "flex"
    gameCard.style.display = "none"
    promptDiv.style.display = "none"
    choicesDiv.style.display = "none"
    feedbackDiv.style.display = "none"
    riddlesIndex = 0
    limbCountVar = 5
    limbCount.innerText = 5
    promptDiv.className = "prompt-div"
    stickLeftArm.className = "left-arm";
    stickRightArm.className = "right-arm";
    stickLeftLeg.className = "left-leg";
    stickRightLeg.className = "right-leg";
    stickHead.style.animation = "rock 1s alternate infinite ease-in-out"
    winAudio.pause()
    winAudio.currentTime = 0
    failAudio.pause()
    failAudio.currentTime = 0
}