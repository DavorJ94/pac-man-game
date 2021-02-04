import { ghosts } from "./ghosts.js";
import { createBoard } from "./createBoard.js";
import { moveGhost } from "./ghostMovement.js";
import { checkIfGameOver, checkIfWin } from "./winLoseCheck.js";
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

export let pacmanCurrentPosition = 489;

squares[pacmanCurrentPosition].classList.add("pacman");

export function controlPacmanMovement(e) {
  // defining movement variables to keep code concise
  const moveUp = squares[pacmanCurrentPosition - width];
  const moveDown = squares[pacmanCurrentPosition + width];
  const moveLeft = squares[pacmanCurrentPosition - 1];
  const moveRight = squares[pacmanCurrentPosition + 1];
  switch (e.key) {
    case "ArrowUp":
      if (moveUp.className !== "wall" && moveUp.className !== "ghost-lair") {
        squares[pacmanCurrentPosition].classList.remove("pacman");
        pacmanCurrentPosition -= width;
        squares[pacmanCurrentPosition].classList.add("pacman");
      }
      break;
    case "ArrowRight":
      if (pacmanCurrentPosition === 391) {
        squares[pacmanCurrentPosition].classList.remove("pacman");
        pacmanCurrentPosition = 364;
        squares[pacmanCurrentPosition].classList.add("pacman");
      }
      if (
        moveRight.className !== "wall" &&
        moveRight.className !== "ghost-lair"
      ) {
        squares[pacmanCurrentPosition].classList.remove("pacman");
        pacmanCurrentPosition += 1;
        squares[pacmanCurrentPosition].classList.add("pacman");
      }
      break;
    case "ArrowDown":
      if (
        moveDown.className !== "wall" &&
        moveDown.className !== "ghost-lair"
      ) {
        squares[pacmanCurrentPosition].classList.remove("pacman");
        pacmanCurrentPosition += width;
        squares[pacmanCurrentPosition].classList.add("pacman");
      }
      break;
    case "ArrowLeft":
      if (pacmanCurrentPosition === 364) {
        squares[pacmanCurrentPosition].classList.remove("pacman");
        pacmanCurrentPosition = 391;
        squares[pacmanCurrentPosition].classList.add("pacman");
      }
      if (
        moveLeft.className !== "wall" &&
        moveLeft.className !== "ghost-lair"
      ) {
        squares[pacmanCurrentPosition].classList.remove("pacman");
        pacmanCurrentPosition -= 1;
        squares[pacmanCurrentPosition].classList.add("pacman");
      }

      break;
  }
  checkIfGameOver(squares, pacmanCurrentPosition, ghosts);
  checkIfWin(ghosts);
}

document.addEventListener("keydown", controlPacmanMovement);

document.addEventListener("keydown", pacDotEaten);

document.addEventListener("keydown", powerPelletEaten);

ghosts.forEach((ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add("ghost");
});

// move ghosts
ghosts.forEach((ghost) => moveGhost(ghost));
