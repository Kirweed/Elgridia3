/* eslint-disable @typescript-eslint/no-explicit-any */

import { UpdatePlayerLocation } from "src/modules/game/hooks";

import GameObject from "./GameObject";
import { Directions } from "./types";

export class Player extends GameObject {
  [key: string]: any;
  movingProgressRemaining: number;
  direction: Directions;
  directionUpdate: Record<Directions, [string, number]>;
  isPlayer: true;
  updatePlayerLocation: UpdatePlayerLocation;
  frameSpeed: number;

  constructor(config: any) {
    super(config);
    this.movingProgressRemaining = 0;
    this.direction = config.direction || "down";
    this.isPlayer = true;
    this.updatePlayerLocation = config.updatePlayerLocation;
    this.frameSpeed = config.frameSpeed;

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
      this.direction = direction;
      this.movingProgressRemaining = this.frameSpeed;
      const newLocation = this.getFuturePlayerCords();
      this.updatePlayerLocation(newLocation);
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, value] = this.directionUpdate[this.direction];
      this[property] += value;
      this.movingProgressRemaining -= 1;
    }
  }

  getFuturePlayerCords() {
    const [property, value] = this.directionUpdate[this.direction];

    return {
      x: this.x / 32,
      y: this.y / 32,
      [property]: this[property] / 32 + value,
    };
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
