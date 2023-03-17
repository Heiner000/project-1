console.log("welcome to the bridge troll toll project")

const startBtn = document.querySelector("#start-btn")
const instructionsBtn = document.querySelector("#instructions-btn")
const titleCard = document.querySelector("#title-card")
const gameCard = document.querySelector("#game-card")
const promptDiv = document.querySelector("#prompt-div")
const choicesDiv = document.querySelector("#choices-div")

console.log(startBtn, instructionsBtn)

startBtn.addEventListener("click", () => {
    titleCard.style.display = "none"
    gameCard.style.display = "grid"
    promptDiv.style.display = "flex"
    choicesDiv.style.display = "grid"
    displayRiddle(riddle[0])
})

const riddle = [
    {
        prompt: "You measure my life in hours and I serve you by expiring. I'm quick when I'm thin and slow when I'm fat. The wind is my enemy. What am I",
        choices: ["Candle","Hourglass","Caterpillar","Battery"],
        answer: "Candle"
    }
]

let riddleIndex

function displayRiddle(riddle) {
    promptDiv.innerText = riddle.prompt
    let choiceBtns = document.querySelectorAll(".choice-btn")
    for (let i = 0; i < riddle.choices.length; i++) {
        choiceBtns[i].innerText = riddle.choices[i]
    }
}


