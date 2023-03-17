# Project 1 - The Bridge Troll's Toll - Text-Based Adventure (working title)

## The Story so Far:

Hump is an apprentice to Master Wizard Timothy. Master Timothy has been commissioned by his monarch to brew a special potion, however he lacks the needed ingredients.
There is an herbalist across the bridge who can grow the specific reagents for the brew, but it will take time. Master Timothy will send Hump to fetch the ingredients when they are ready, but each time Hump crosses the bridge he will have to pay the bridge Troll's toll.

The bridge Troll's **toll** must be paid, and he will only be satisfied with **blood and bones!** Unless you can answer his increasingly difficult series of **riddles**, then perhaps he'll let you by this time without a bite.

In this text-based adventure game Hump must answer the troll's riddles correctly to cross the bridge, otherwise he may take a limb. Lose more than 3 limbs and he won't make a very good wizard's apprentice anymore. Answer enough riddles correctly to bring back the required herbs or he'll lose his apprenticeship. 

![Wireframe](./images/Wireframe.png)

## Tech Stack:

+ HTML
+ CSS
+ JavaScript
    + DOM Manipulation

## MVP Goals
+ Display a starting screen with instruction button & start button
+ Gameplay screen displays prompt area, option buttons, Hump's limb count, gold, & inventory
+ Prompt area contains Troll's dialogue/riddle
+ 4 buttons of options for possible riddle solutions
+ Decrement Hump's limb count for each riddle missed
+ Display loser screen for 4th loss & include reset button
+ Display winner screen for _14(?)_+ riddles solved
+ Randomly populate riddle prompt with riddles pulled from 3 different arrays rated on riddle difficulty

## Stretch Goals
+ Include hard mode where instead of 4 buttons, there's just a form for user's input to answer riddles
+ Wizard difficulty mode: form/no buttons + only pull riddles from hardest array
+ Have additional prompts that allow Hump opportunities to gain or lose gold
+ Enough gold could purchase a distraction allowing Hump to skip a riddle
+ Set time limit for each answer
+ Possible sprites or additional styling

## Potential Roadblocks
+ Not sure if this qualifies as user playing against the computer/no multiplayer functionality
+ 