import { ghosts } from "./ghosts.js";
import { createBoard } from "./createBoard.js";
import { moveGhost } from "./ghostMovement.js";
import {
  controlPacmanMovement,
  pacmanCurrentPosition,
} from "./controlPacmanMovement.js";
import { pacDotEaten, powerPelletEaten } from "./dotAndPelletEaten.js";

export const width = 28;
export let squares = [];
export let score = 0;
export function modifyScore(value) {
  score += value;
}
export const grid = document.querySelector(".grid");

//creating board
createBoard();

// export let pacmanCurrentPosition = 489;

squares[pacmanCurrentPosition].classList.add("pacman");

// adding event listeners, check modules for details
document.addEventListener("keydown", controlPacmanMovement);

document.addEventListener("keydown", pacDotEaten);

document.addEventListener("keydown", powerPelletEaten);

ghosts.forEach((ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add("ghost");
});

// move ghosts
ghosts.forEach((ghost) => moveGhost(ghost));
