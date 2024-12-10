/* eslint-disable @typescript-eslint/no-explicit-any */

import GameObject from "./GameObject";
import { Directions } from "./types";

export class Player extends GameObject {
  [key: string]: any;
  movingProgressRemaining: number;
  direction: Directions;
  directionUpdate: Record<Directions, [string, number]>;
  isPlayer: true;

  constructor(config: any) {
    super(config);
    this.movingProgressRemaining = 0;
    this.direction = config.direction || "down";
    this.isPlayer = true;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      right: ["x", 1],
      left: ["x", -1],
    };
  }

  update(direction?: Directions | null) {
    this.updatePosition();
    this.udpateSprite(direction);

    if (direction && this.movingProgressRemaining === 0) {
      console.log(this.x / 32);
      console.log("y", this.y / 32);
      this.direction = direction;
      this.movingProgressRemaining = 32;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, value] = this.directionUpdate[this.direction];
      this[property] += value;
      this.movingProgressRemaining -= 1;
    }
  }

  udpateSprite(direction?: Directions | null) {
    if (this.movingProgressRemaining === 0 && !direction) {
      this.sprite.setAnimation(`idle-${this.direction}`);
      return;
    }
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
    }
  }
}
