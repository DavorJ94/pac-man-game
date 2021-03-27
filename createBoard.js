import { squares, grid } from "./index.js";
import { layout } from "./layoutArray.js";
export function createBoard() {
  grid.innerHTML = "";
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
