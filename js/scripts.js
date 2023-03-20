console.log("welcome to the bridge troll toll project")

const startBtn = document.querySelector("#start-btn")
const instructionsBtn = document.querySelector("#instructions-btn")
const titleCard = document.querySelector("#title-card")
const gameCard = document.querySelector("#game-card")
const promptDiv = document.querySelector("#prompt-div")
const choicesDiv = document.querySelector("#choices-div")
const limbList = document.querySelector("#limb-list")
const tooltip = document.querySelector("#tooltip")
const feedbackDiv = document.querySelector("#feedback-div")
const limbCount = document.querySelector("#limb-count")


const choice1 = document.querySelector("#choice-1")
const choice2 = document.querySelector("#choice-2")
const choice3 = document.querySelector("#choice-3")
const choice4 = document.querySelector("#choice-4")

let jobsDone = false
let limbCountVar = 5

const trollingPhrases = [
    "*CHOMP* Wrong! *nomnomnom*",
    "Nope! *crunchcrunch*",
    "*crunching and slurrping noises*",
    "Nice Try! I'll take that...",
    "Just a quick bite",
    "How about a small piece"
]

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
    }
]
let riddlesIndex = 0
let currentRiddle = riddles[riddlesIndex]


startBtn.addEventListener("click", () => {
    console.log("That sounded like the click of a start button")
    titleCard.style.display = "none"
    gameCard.style.display = "grid"
    promptDiv.style.display = "flex"
    choicesDiv.style.display = "grid"
    displayRiddle(riddles[0])
})

choice1.addEventListener("mousedown", handleChoiceClick)
choice2.addEventListener("mousedown", handleChoiceClick)
choice3.addEventListener("mousedown", handleChoiceClick)
choice4.addEventListener("mousedown", handleChoiceClick)

function handleChoiceClick(e) {
    const userChoice = e.target.innerText;
    currentRiddle = riddles[riddlesIndex]
    const currentRiddleAnswer = currentRiddle.answer
    console.log("you clicked:", userChoice, "answer", currentRiddleAnswer)
    
    // create a checkAnswer function
    const isCorrect = checkAnswer(userChoice, currentRiddleAnswer)
    
    console.log("riddlesIndex: ", riddlesIndex)
}

function checkAnswer(userChoice, currentRiddleAnswer) {
    if (userChoice === currentRiddleAnswer) {
        console.log("GOOD JOB - YOU GOT IT RIGHT")  // **** I want to make this it's own function
        // need a feedback message
        choicesDiv.style.display = "none"
        feedbackDiv.style.display = "flex"
        feedbackDiv.innerText = "Good jorb, we'll see if you can do it again..."
        
        // need to advance to next question
        riddlesIndex++
        const nextRiddleBtn = document.createElement("button")
        nextRiddleBtn.id = "next-riddle-btn"
        feedbackDiv.append(nextRiddleBtn)
        if (riddlesIndex === riddles.length) {
            jobsDone = true
            gameOver()
            // *** need a reset button function *********
            nextRiddleBtn.innerText = "Reset"
            nextRiddleBtn.addEventListener("click", () => {
                console.log("That sounded like the click of a reset button")
                titleCard.style.display = "flex"
                gameCard.style.display = "none"
                promptDiv.style.display = "none"
                choicesDiv.style.display = "none"
                feedbackDiv.style.display = "none"
                riddlesIndex = 0
                limbCountVar = 5
            })
        } else {
            nextRiddleBtn.innerText = "Next Riddle"
            nextRiddleBtn.addEventListener("click", () => {
                feedbackDiv.style.display = "none"
                displayRiddle(riddles[riddlesIndex])
            })
        }
        
    } else {
        if (limbCountVar > 0) {
            const trollingIndex = Math.floor(Math.random() * trollingPhrases.length)
            const trollPhrase = document.createElement("p")
            trollPhrase.className = "troll-phrase"
            trollPhrase.innerText = trollingPhrases[trollingIndex]
            if (promptDiv.lastChild.className === "troll-phrase") {
                promptDiv.lastChild.innerText = trollPhrase.innerText + `... you've lost a limb`;
            } else {
                promptDiv.appendChild(trollPhrase)
            }
            // console.log("OOPS, LoSt A LiMb!!")
            removeLimb()
        } else {
            jobsDone = true
            gameOver()
        }
    }
}

function displayRiddle(riddle) {
    promptDiv.innerText = riddle.prompt
    choicesDiv.style.display = "grid"
    let choiceBtns = document.querySelectorAll(".choice-btn") // ***** should this be in its own function as well?
    for (let i = 0; i < riddle.choices.length; i++) {
        choiceBtns[i].innerText = riddle.choices[i]
    }
    console.log(riddlesIndex, riddle.answer)
}

// need a function to decrement Hump's limbs on wrong answers.
function removeLimb() {
    limbCountVar -= 1
    limbCount.innerText = limbCountVar
    let lostLimb = limbList.lastElementChild  
    if (limbCountVar > 0) {
        console.log(`${lostLimb} removed.`)
        lostLimb.remove()
    } else {
        jobsDone = true
        console.log("Game Over, you're troll food.")
        lostLimb.remove()
        gameOver()
    }
}

// need gameover screens, both winner & loser
function gameOver() {
    choicesDiv.style.display = "none"
    feedbackDiv.style.display = "flex"
    if (jobsDone = true) {
        if (limbCountVar > 0) {
            promptDiv.style.classList
            promptDiv.innerText = "You won! You paid the Troll's Toll with change leftover- time to celebrate!"
            promptDiv.classList.toggle("win-text")
        } else {
            promptDiv.innerText = "You lose! The Bridge Troll's Toll cost you everything. Good luck with your next life."
            promptDiv.classList.toggle("lose-text")
            const resetButton = document.createElement("button")
            resetButton.innerText = "Reset"
            feedbackDiv.append(resetButton)
            resetButton.addEventListener("click", () => {
                console.log("That sounded like the click of a reset button")
                titleCard.style.display = "flex"
                gameCard.style.display = "none"
                promptDiv.style.display = "none"
                choicesDiv.style.display = "none"
                feedbackDiv.style.display = "none"
                riddlesIndex = 0
                limbCountVar = 5
                promptDiv.classList.toggle("lose-text")
            })
        }
    }

}