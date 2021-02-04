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

export const ghosts = [
  new Ghost("pinky", 348, 250),
  new Ghost("blinky", 376, 300),
  new Ghost("inky", 351, 350),
  new Ghost("clyde", 379, 400),
];
