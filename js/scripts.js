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
})