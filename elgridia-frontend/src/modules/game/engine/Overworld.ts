import { RefObject } from "react";

import { OverworldMap } from "./OverworldMap";
import { Player } from "./Player";
import { DirectionInput } from "./DirectionInput";

interface OverworldConfig {
  canvas: RefObject<HTMLCanvasElement>;
  gameContainer: RefObject<HTMLDivElement>;
  setIsLoading: (isLoading: boolean) => void;
  player: Player;
  map: OverworldMap;
}

export class Overworld {
  canvas: RefObject<HTMLCanvasElement>;
  gameContainer: RefObject<HTMLDivElement>;
  ctx: CanvasRenderingContext2D | null;
  directionInput?: DirectionInput;
  setIsLoading: (isLoading: boolean) => void;
  player: Player;
  map: OverworldMap;

  constructor(config: OverworldConfig) {
    this.canvas = config.canvas;
    this.gameContainer = config.gameContainer;
    this.ctx = this.canvas.current?.getContext("2d") || null;
    this.setIsLoading = config.setIsLoading;
    this.player = config.player;
    this.map = config.map;
  }

  startGameLoop() {
    const step = () => {
      if (!this.ctx || !this.canvas.current || !this.map) return;

      this.ctx.clearRect(
        0,
        0,
        this.canvas.current.width,
        this.canvas.current.height,
      );

      const cameraContext = this.player;

      this.map.drawImage(
        this.ctx,
        cameraContext,
        this.canvas.current.width,
        this.canvas.current.height,
      );
      this.player.update(this.directionInput?.currentDirection);
      if (this.ctx && this.canvas.current && this.map) {
        this.player.sprite.draw(
          this.ctx,
          cameraContext,
          this.canvas.current.width,
          this.canvas.current.height,
          this.map.image,
        );
      }
      Object.values(this.map.npcs || {}).forEach((object) => {
        if (this.ctx && this.canvas.current && this.map)
          object.sprite.draw(
            this.ctx,
            cameraContext,
            this.canvas.current.width,
            this.canvas.current.height,
            this.map.image,
          );
      });

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  resizeCanvas() {
    if (this.canvas.current && this.gameContainer.current) {
      this.canvas.current.width = this.gameContainer.current.clientWidth - 420;
      this.canvas.current.height = this.gameContainer.current.clientHeight;
    }
  }

  init() {
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas.call(this));

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
    this.setIsLoading(false);
  }
}
