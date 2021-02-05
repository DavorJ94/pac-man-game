import { checkIfGameOver, checkIfWin } from "./winLoseCheck.js";
import { squares, width } from "./index.js";

export let pacmanCurrentPosition = 489;

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
  checkIfGameOver();
  checkIfWin();
}
