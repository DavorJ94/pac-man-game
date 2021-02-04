import { ghosts } from "./ghosts.js";
import { createBoard } from "./createBoard.js";
import { moveGhost } from "./ghostMovement.js";

export const width = 28;
export let squares = [];

const grid = document.querySelector(".grid");
let score = 0;

//creating board
createBoard(squares, grid);

let pacmanCurrentPosition = 489;

squares[pacmanCurrentPosition].classList.add("pacman");

function controlPacmanMovement(e) {
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

function pacDotEaten() {
  if (squares[pacmanCurrentPosition].classList.contains("pac-dot")) {
    score += 1;
    document.getElementById("score").innerText = " " + score;
    squares[pacmanCurrentPosition].classList.remove("pac-dot");
    squares[pacmanCurrentPosition].classList.add("pacman");
  }
}
document.addEventListener("keydown", pacDotEaten);

function powerPelletEaten() {
  if (squares[pacmanCurrentPosition].classList.contains("power-pellet")) {
    score += 10;
    document.getElementById("score").innerText = " " + score;
    squares[pacmanCurrentPosition].classList.remove("power-pellet");
    squares[pacmanCurrentPosition].classList.add("pacman");
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(() => {
      ghosts.forEach((ghost) => (ghost.isScared = false));
    }, 10000);
  }
}
document.addEventListener("keydown", powerPelletEaten);

ghosts.forEach((ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add("ghost");
});

// move ghosts
ghosts.forEach((ghost) => moveGhost(ghost));
// // move ghosts
// ghosts.forEach((ghost) => moveGhost(ghost));

// function moveGhost(ghost) {
//   const movingDirection = [1, -1, -width, width];
//   let currentDirection =
//     movingDirection[Math.floor(Math.random() * movingDirection.length)];

//   ghost.timerId = setInterval(function () {
//     if (
//       !squares[ghost.currentIndex + currentDirection].classList.contains(
//         "wall"
//       ) &&
//       !squares[ghost.currentIndex + currentDirection].classList.contains(
//         "ghost"
//       )
//     ) {
//       squares[ghost.currentIndex].classList.remove(ghost.className);
//       squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
//       ghost.currentIndex += currentDirection;
//       squares[ghost.currentIndex].classList.add(ghost.className);
//       squares[ghost.currentIndex].classList.add("ghost");
//     } else currentDirection = movingDirection[Math.floor(Math.random() * movingDirection.length)];

//     if (ghost.isScared) {
//       squares[ghost.currentIndex].classList.add("scared-ghost");
//     }

//     if (
//       ghost.isScared &&
//       squares[ghost.currentIndex].classList.contains("pacman")
//     ) {
//       squares[ghost.currentIndex].classList.remove(
//         "ghost",
//         "scared-ghost",
//         ghost.className
//       );
//       ghost.currentIndex = ghost.startIndex;
//       score += 100;
//       document.getElementById("score").innerText = " " + score;
//       squares[ghost.currentIndex].classList.add(
//         "ghost",
//         "scared-ghost",
//         ghost.className
//       );
//     }
//   }, ghost.speed);
// }

function checkIfGameOver() {
  if (
    squares[pacmanCurrentPosition].classList.contains("ghost") &&
    !squares[pacmanCurrentPosition].classList.contains("scared-ghost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));

    document.removeEventListener("keydown", controlPacmanMovement);
    document.removeEventListener("keydown", pacDotEaten);
    document.removeEventListener("keydown", powerPelletEaten);

    document.querySelector(
      "H3"
    ).innerText = `GAME OVER! Your score was ${score}. 😔`;
    document.querySelector("H3").style = "color: red";
  }
}

function checkIfWin() {
  if (score >= 2000) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));

    document.removeEventListener("keydown", controlPacmanMovement);
    document.removeEventListener("keydown", pacDotEaten);
    document.removeEventListener("keydown", powerPelletEaten);

    document.querySelector(
      "H3"
    ).innerText = `YOU WIN! You've reached more than ${score} point(s). 🎉`;
    document.querySelector("H3").style = "color: green";
  }
}
