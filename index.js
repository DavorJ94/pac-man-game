import { ghosts } from "./ghosts.js";
import { createBoard } from "./createBoard.js";
import { moveGhost, updateEatenGhost } from "./ghostMovement.js";
import {
  controlPacmanMovement,
  pacmanCurrentPosition,
} from "./controlPacmanMovement.js";
import { pacDotEaten, powerPelletEaten } from "./dotAndPelletEaten.js";

export const width = 28;
const leftButton = document.querySelector(".leftButton");
const rightButton = document.querySelector(".rightButton");
const upButton = document.querySelector(".upButton");
const downButton = document.querySelector(".downButton");
const modal = document.querySelector("#myModal");
const startBtn = document.querySelector("#start");
export let squares = [];
export let score = 0;
export function modifyScore(value) {
  score += value;
}
export const grid = document.querySelector(".grid");

//creating board
createBoard();

squares[pacmanCurrentPosition].classList.add("pacman");

leftButton.onclick = function () {
  controlPacmanMovement({ key: "ArrowLeft" });
  pacDotEaten();
  powerPelletEaten();
};

rightButton.onclick = function () {
  controlPacmanMovement({ key: "ArrowRight" });
  pacDotEaten();
  powerPelletEaten();
};

upButton.onclick = function () {
  controlPacmanMovement({ key: "ArrowUp" });
  pacDotEaten();
  powerPelletEaten();
};

downButton.onclick = function () {
  controlPacmanMovement({ key: "ArrowDown" });
  pacDotEaten();
  powerPelletEaten();
};

// adding event listeners, check modules for details
document.addEventListener("keydown", controlPacmanMovement);

document.addEventListener("keydown", pacDotEaten);

document.addEventListener("keydown", powerPelletEaten);

ghosts.forEach((ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add("ghost");
});

startBtn.onclick = function () {
  window.location.reload();
};

// move ghosts
ghosts.forEach((ghost) => moveGhost(ghost));
ghosts.forEach((ghost) => updateEatenGhost(ghost));
