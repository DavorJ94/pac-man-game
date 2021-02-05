import { squares } from "./index.js";
import { pacmanCurrentPosition } from "./controlPacmanMovement.js";
import { ghosts } from "./ghosts.js";
import { score, modifyScore } from "./index.js";

export function pacDotEaten() {
  if (squares[pacmanCurrentPosition].classList.contains("pac-dot")) {
    modifyScore(1);
    document.getElementById("score").innerText = " " + score;
    squares[pacmanCurrentPosition].classList.remove("pac-dot");
    squares[pacmanCurrentPosition].classList.add("pacman");
  }
}

export function powerPelletEaten() {
  if (squares[pacmanCurrentPosition].classList.contains("power-pellet")) {
    modifyScore(10);
    document.getElementById("score").innerText = " " + score;
    squares[pacmanCurrentPosition].classList.remove("power-pellet");
    squares[pacmanCurrentPosition].classList.add("pacman");
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(() => {
      ghosts.forEach((ghost) => (ghost.isScared = false));
    }, 10000);
  }
}
