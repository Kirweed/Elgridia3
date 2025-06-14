/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controls } from "src/modules/game/engine/types";
import gameManager from "src/modules/game/engine/GameManager/GameManager";
import { updatePlayerPosition } from "src/modules/game/engine/asyncActions/updatePlayerPosition";

import GameObject from "./GameObject";

export class Player extends GameObject {
  [x: string]: any;
  movingProgressRemaining: number;
  direction: Controls;
  directionUpdate: Record<Controls, [string, number]>;
  isPlayer: true;
  frameSpeed: number;

  constructor(config: any) {
    super(config);
    this.movingProgressRemaining = 0;
    this.direction = config.direction || "down";
    this.isPlayer = true;
    this.frameSpeed = config.frameSpeed;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      right: ["x", 1],
      left: ["x", -1],
    };
  }

  update(direction?: Controls | null) {
    this.updatePosition();
    this.udpateSprite(direction);

    if (direction && this.movingProgressRemaining === 0) {
      this.direction = direction;
      this.movingProgressRemaining = this.frameSpeed;
      const newLocation = this.getFuturePlayerCords();
      gameManager.dispatchToRedux(
        updatePlayerPosition({ ...newLocation, id: 0 }),
      );
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

  udpateSprite(direction?: Controls | null) {
    if (this.movingProgressRemaining === 0 && !direction) {
      this.sprite.setAnimation(`idle-${this.direction}`);
      return;
    }
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
    }
  }
}
