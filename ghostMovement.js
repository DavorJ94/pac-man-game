import { width, squares } from "./index.js";
import { score, modifyScore } from "./index.js";
import { checkIfGameOver, checkIfWin } from "./winLoseCheck.js";

export function moveGhost(ghost) {
  const movingDirection = [1, -1, -width, width];
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

    checkIfGameOver();
  }, ghost.speed);
}
export let anotherInterval;
export function updateEatenGhost(ghost) {
  let anotherInterval = setInterval(function () {
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
      modifyScore(100);
      document.getElementById("score").innerText = " " + score;
      squares[ghost.currentIndex].classList.add(
        "ghost",
        "scared-ghost",
        ghost.className
      );
    }
    if (ghost.isScared) {
      document.querySelector(".grid").style.boxShadow = "0px 0px 20px 2px red";
    } else {
      document.querySelector(".grid").style.boxShadow = "";
    }
    if (checkIfGameOver()) {
      clearInterval(anotherInterval);
    }
    checkIfWin();
  }, 50);
}
