import { Directions } from "./types";

type keyToDirectionMap = Record<string, Directions>;

export class DirectionInput {
  keyToDirectionMap: keyToDirectionMap;
  currentDirection: null | Directions;

  constructor() {
    this.currentDirection = null;
    this.keyToDirectionMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      KeyW: "up",
      KeyA: "left",
      KeyS: "down",
      KeyD: "right",
    };
  }

  init() {
    document.addEventListener("keydown", (e) => {
      this.currentDirection = this.keyToDirectionMap[e.code];
    });
    document.addEventListener("keyup", (e) => {
      if (this.currentDirection === this.keyToDirectionMap[e.code]) {
        this.currentDirection = null;
      }
    });
  }
}
