import { squares } from "./index.js";
import {
  controlPacmanMovement,
  pacmanCurrentPosition,
} from "./controlPacmanMovement.js";
import { ghosts } from "./ghosts.js";
import { anotherInterval } from "./ghostMovement.js";
import { pacDotEaten, powerPelletEaten } from "./dotAndPelletEaten.js";
import { score } from "./index.js";

export function checkIfGameOver() {
  if (
    squares[pacmanCurrentPosition].classList.contains("ghost") &&
    !squares[pacmanCurrentPosition].classList.contains("scared-ghost")
  ) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    clearInterval(anotherInterval); // This interval is for faster update of eaten ghosts

    document.removeEventListener("keydown", controlPacmanMovement);
    document.removeEventListener("keydown", pacDotEaten);
    document.removeEventListener("keydown", powerPelletEaten);

    document.querySelector(
      "H3"
    ).innerText = `GAME OVER! Your score was ${score}. 😔`;
    document.querySelector("H3").style = "color: red";
  }
}

export function checkIfWin() {
  if (score >= 1500) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId));
    clearInterval(anotherInterval); // This interval is for faster update of eaten ghosts

    document.removeEventListener("keydown", controlPacmanMovement);
    document.removeEventListener("keydown", pacDotEaten);
    document.removeEventListener("keydown", powerPelletEaten);

    document.querySelector(
      "H3"
    ).innerHTML = `YOU WIN! <br> You've reached more than ${score} point(s). 🎉`;
    document.querySelector("H3").style = "color: green";
  }
}
