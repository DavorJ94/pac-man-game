import { layout } from "./layoutArray.js";

const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
let squares = [];
let score = 0;

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lairs
// 3 - power-pellets
// 4 - empty spaces

//creating board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    let tempDiv = document.createElement("DIV");
    squares.push(tempDiv);
    grid.appendChild(tempDiv);
    if (layout[i] === 0) grid.appendChild(tempDiv).classList.add("pac-dot");
    if (layout[i] === 1) grid.appendChild(tempDiv).classList.add("wall");
    if (layout[i] === 2) grid.appendChild(tempDiv).classList.add("ghost-lair");
    if (layout[i] === 3)
      grid.appendChild(tempDiv).classList.add("power-pellet");
  }
}
createBoard();

let pacmanCurrentPosition = 489;

squares[pacmanCurrentPosition].classList.add("pacman");

function controlPacmanMovement(e) {
  // defining movement variables to keep code concise
  const moveUp = squares[pacmanCurrentPosition - 28];
  const moveDown = squares[pacmanCurrentPosition + 28];
  const moveLeft = squares[pacmanCurrentPosition - 1];
  const moveRight = squares[pacmanCurrentPosition + 1];
  switch (e.key) {
    case "ArrowUp":
      if (moveUp.className !== "wall" && moveUp.className !== "ghost-lair") {
        squares[pacmanCurrentPosition].classList.remove("pacman");
        pacmanCurrentPosition -= 28;
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
        pacmanCurrentPosition += 28;
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

class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}
// ghosts section
const ghosts = [
  new Ghost("pinky", 348, 250),
  new Ghost("blinky", 376, 300),
  new Ghost("inky", 351, 350),
  new Ghost("clyde", 379, 400),
];

ghosts.forEach((ghost) => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add("ghost");
});

// move ghosts

ghosts.forEach((ghost) => moveGhost(ghost));

function moveGhost(ghost) {
  const movingDirection = [1, -1, -28, 28];
  let currentDirection =
    movingDirection[Math.floor(Math.random() * movingDirection.length)];

  ghost.timerId = setInterval(function () {
    if (
      !squares[ghost.currentIndex + currentDirection].classList.contains(
        "wall"
      ) &&
      !squares[ghost.currentIndex + currentDirection].classList.contains(
        "ghost"
      )
    ) {
      squares[ghost.currentIndex].classList.remove(ghost.className);
      squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
      ghost.currentIndex += currentDirection;
      squares[ghost.currentIndex].classList.add(ghost.className);
      squares[ghost.currentIndex].classList.add("ghost");
    } else currentDirection = movingDirection[Math.floor(Math.random() * movingDirection.length)];

    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add("scared-ghost");
    }

    if (
      ghost.isScared &&
      squares[ghost.currentIndex].classList.contains("pacman")
    ) {
      squares[ghost.currentIndex].classList.remove(
        "ghost",
        "scared-ghost",
        ghost.className
      );
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      document.getElementById("score").innerText = " " + score;
      squares[ghost.currentIndex].classList.add(
        "ghost",
        "scared-ghost",
        ghost.className
      );
    }
  }, ghost.speed);
}

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
    ).innerHTML = `GAME OVER! Your score was ${score}. 😔`;
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
    ).innerHTML = `YOU WIN! You've reached more than ${score} point(s). 🎉`;
    document.querySelector("H3").style = "color: green";
  }
}
