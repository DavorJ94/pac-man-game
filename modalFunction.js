const modal = document.getElementById("myModal");

export default function modalFunction(text, boolean) {
  modal.style.display = "block";
  if (boolean) {
    const gameOver = document.querySelector(".gameOver");
    const endScore = document.querySelector(".endScore");
    const tryAgain = document.querySelector(".tryAgain");
    gameOver.innerText = "YOU WIN!";
    endScore.innerText = `You've reached more than ${text} point(s). 🎉`;
    tryAgain.innerText = `Can you do it again? 😏`;
    gameOver.style = "color: green";
    endScore.style = "color: green";
  } else {
    const score = document.querySelector("#scoreModal");
    score.innerText = text;
  }
}
