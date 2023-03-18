console.log("welcome to the bridge troll toll project")

const startBtn = document.querySelector("#start-btn")
const instructionsBtn = document.querySelector("#instructions-btn")
const titleCard = document.querySelector("#title-card")
const gameCard = document.querySelector("#game-card")
const promptDiv = document.querySelector("#prompt-div")
const choicesDiv = document.querySelector("#choices-div")

const choice1 = document.querySelector("#choice-1")
const choice2 = document.querySelector("#choice-2")
const choice3 = document.querySelector("#choice-3")
const choice4 = document.querySelector("#choice-4")

let riddlesIndex = 0

startBtn.addEventListener("click", () => {
    titleCard.style.display = "none"
    gameCard.style.display = "grid"
    promptDiv.style.display = "flex"
    choicesDiv.style.display = "grid"
    displayRiddle(riddles[0])
})

choice1.addEventListener("click", handleChoiceClick)
choice2.addEventListener("click", handleChoiceClick)
choice3.addEventListener("click", handleChoiceClick)
choice4.addEventListener("click", handleChoiceClick)

const riddles = [
    {
        prompt: "You measure my life in hours and I serve you by expiring. I'm quick when I'm thin and slow when I'm fat. The wind is my enemy. What am I",
        choices: ["Candle","Hourglass","Caterpillar","Battery"],
        answer: "Candle"
    },
    {
        prompt: "I am not alive, but I grow; I don't have lungs, but I need air; I don't have a mouth, but I consume all that surrounds me. What am I?",
        choices: ["Fire","Rust", "Crystal","River"],
        answer: "Fire"
    },
    {
        prompt: "I am light as a feather, yet the strongest man cannot hold me fo rmuch more than a moment. What am I?",
        choices: ["Thought","Time","Idea","Breath"],
        answer: "Breath"
    }
]

function handleChoiceClick(e) {
    const userChoice = e.target.innerText;
    const currentRiddle = riddles[riddlesIndex]

    if (userChoice === currentRiddle.answer) {
        console.log("GOOD JOB - YOU GOT IT RIGHT")
    } else {
        console.log("OOPS, YOU'RE TROLL FOOD")
    }
    riddlesIndex++
    console.log(riddlesIndex)
    // need a feedback message
    // need to advance to next question
}

function displayRiddle(riddle) {
    promptDiv.innerText = riddle.prompt
    let choiceBtns = document.querySelectorAll(".choice-btn")
    for (let i = 0; i < riddle.choices.length; i++) {
        choiceBtns[i].innerText = riddle.choices[i]
    }
}

// need a function to decrement Hump's limbs on wrong answers.
    // maybe we want to add a few limbs to allow for wrong answers on multiple questions

// need gameover screens, both winner & loser
    // need reset button
