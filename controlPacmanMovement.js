import { checkIfGameOver, checkIfWin } from "./winLoseCheck.js";
import { squares, width } from "./index.js";
import { pacDotEaten, powerPelletEaten } from "./dotAndPelletEaten.js";
export let pacmanCurrentPosition = 487;
let direction = 1;

const pacmanSpeed = 150;

let movement = setInterval(move, pacmanSpeed);

export function move() {
  const moveUp = squares[pacmanCurrentPosition - width];
  const moveDown = squares[pacmanCurrentPosition + width];
  const moveLeft = squares[pacmanCurrentPosition - 1];
  const moveRight = squares[pacmanCurrentPosition + 1];
  if (
    moveUp.className !== "wall" &&
    moveUp.className !== "ghost-lair" &&
    direction === -width
  ) {
    squares[pacmanCurrentPosition].classList.remove("pacman");
    pacmanCurrentPosition -= width;
    squares[pacmanCurrentPosition].classList.add("pacman");
    document.querySelector(".pacman").style.transform = "rotate(-90deg)";
  }

  if (
    moveRight.className !== "wall" &&
    moveRight.className !== "ghost-lair" &&
    direction === 1
  ) {
    squares[pacmanCurrentPosition].classList.remove("pacman");
    pacmanCurrentPosition += 1;
    squares[pacmanCurrentPosition].classList.add("pacman");
    document.querySelector(".pacman").style.transform = "rotateY(0deg)";
  }
  if (
    moveLeft.className !== "wall" &&
    moveLeft.className !== "ghost-lair" &&
    direction === -1
  ) {
    squares[pacmanCurrentPosition].classList.remove("pacman");
    pacmanCurrentPosition -= 1;
    squares[pacmanCurrentPosition].classList.add("pacman");
    document.querySelector(".pacman").style.transform = "rotateY(-180deg)";
  }
  if (
    moveDown.className !== "wall" &&
    moveDown.className !== "ghost-lair" &&
    direction === width
  ) {
    squares[pacmanCurrentPosition].classList.remove("pacman");
    pacmanCurrentPosition += width;
    squares[pacmanCurrentPosition].classList.add("pacman");
    document.querySelector(".pacman").style.transform = "rotate(90deg)";
  }
  if (pacmanCurrentPosition === 391 && direction === 1) {
    squares[pacmanCurrentPosition].classList.remove("pacman");
    pacmanCurrentPosition = 364;
    squares[pacmanCurrentPosition].classList.add("pacman");
    document.querySelector(".pacman").style.transform = "rotateY(0deg)";
  }
  if (pacmanCurrentPosition === 364 && direction === -1) {
    squares[pacmanCurrentPosition].classList.remove("pacman");
    pacmanCurrentPosition = 391;
    squares[pacmanCurrentPosition].classList.add("pacman");
    document.querySelector(".pacman").style.transform = "rotateY(-180deg)";
  }

  pacDotEaten();
  powerPelletEaten();
  if (checkIfGameOver() || checkIfWin()) {
    clearInterval(movement);
    checkIfGameOver();
    checkIfWin();
  }
}

export function controlPacmanMovement(e) {
  const moveUp = squares[pacmanCurrentPosition - width];
  const moveDown = squares[pacmanCurrentPosition + width];
  const moveLeft = squares[pacmanCurrentPosition - 1];
  const moveRight = squares[pacmanCurrentPosition + 1];
  switch (e.key) {
    case "ArrowRight":
      if (
        moveRight.className !== "wall" &&
        moveRight.className !== "ghost-lair"
      ) {
        clearInterval(movement);
        direction = 1;
        movement = setInterval(move, pacmanSpeed);
      }
      break;
    case "ArrowDown":
      if (
        moveDown.className !== "wall" &&
        moveDown.className !== "ghost-lair"
      ) {
        clearInterval(movement);
        direction = width;
        movement = setInterval(move, pacmanSpeed);
      }
      break;
    case "ArrowLeft":
      if (
        moveLeft.className !== "wall" &&
        moveLeft.className !== "ghost-lair"
      ) {
        clearInterval(movement);
        direction = -1;
        movement = setInterval(move, pacmanSpeed);
      }
      break;
    case "ArrowUp":
      if (moveUp.className !== "wall" && moveUp.className !== "ghost-lair") {
        clearInterval(movement);
        direction = -width;
        movement = setInterval(move, pacmanSpeed);
      }
      break;
    default:
      break;
  }
}
