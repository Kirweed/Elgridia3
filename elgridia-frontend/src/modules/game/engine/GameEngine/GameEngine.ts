import { RefObject } from "react";
import gameManager from "src/modules/game/engine/GameManager/GameManager";
import { OverworldMap } from "src/modules/game/engine/OverworldMap";
import { Player } from "src/modules/game/engine/Player";
import CharacterImage from "src/assets/sprites/woj1.png";
import { setLoading } from "src/store/gameReducer";
import { maps } from "src/modules/game/engine/data/maps";
import { Control } from "src/modules/game/engine/Control/Control";

interface EngineConfig {
  canvas: RefObject<HTMLCanvasElement>;
  gameContainer: RefObject<HTMLDivElement>;
}

export class GameEngine {
  canvas: RefObject<HTMLCanvasElement>;
  gameContainer: RefObject<HTMLDivElement>;
  ctx: CanvasRenderingContext2D | null;
  isLoading: boolean;
  player: Player;
  map?: OverworldMap;

  constructor({ canvas, gameContainer }: EngineConfig) {
    this.isLoading = true;
    this.canvas = canvas;
    this.gameContainer = gameContainer;
    this.ctx = this.canvas.current?.getContext("2d") || null;
    this.player = this.loadPlayer();
  }

  loadMap() {
    const { id } = gameManager.getCurrentReduxState().game.location;
    const foundedMap = maps.find(({ id: mapId }) => mapId === id);
    if (foundedMap) {
      this.map = new OverworldMap({
        src: foundedMap.img,
        id: foundedMap.id,
        name: foundedMap.name,
      });
    }
  }

  loadPlayer() {
    return new Player({
      x: gameManager.getCurrentReduxState().game.location.x * 32,
      y: gameManager.getCurrentReduxState().game.location.y * 32,
      src: CharacterImage,
      frameSpeed: 32,
    });
  }

  startGameLoop() {
    gameManager.dispatchToRedux(setLoading(false));
    this.loadMap();
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
      this.player.update(
        gameManager.getCurrentReduxState().game.currentDirection,
      );
      if (this.ctx && this.canvas.current && this.map) {
        this.player.sprite.draw(
          this.ctx,
          cameraContext,
          this.canvas.current.width,
          this.canvas.current.height,
          this.map.image,
        );
      }

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

    new Control();

    this.startGameLoop();
  }
}
