import GameObject from "./GameObject";
import { Player } from "./Player";
import { mapEdgeToStick } from "./utils/mapShouldStickToEdge";

interface OverworldMapConfig {
  npcs?: Record<string, GameObject>;
  players: Record<string, Player>;
  src: string;
}

export class OverworldMap {
  npcs?: Record<string, GameObject>;
  players: Record<string, Player>;
  image: HTMLImageElement;

  constructor(config: OverworldMapConfig) {
    this.npcs = config.npcs;
    this.players = config.players;
    this.image = new Image();
    this.image.src = config.src;
  }

  drawImage(
    ctx: CanvasRenderingContext2D,
    cameraContext: Player,
    canvasWidth: number,
    canvasHeight: number,
  ) {
    const stickMapEdgeX = mapEdgeToStick(
      this.image.naturalWidth,
      cameraContext.x,
      canvasWidth,
    );
    const stickMapEdgeY = mapEdgeToStick(
      this.image.naturalHeight,
      cameraContext.y,
      canvasHeight,
    );
    const stickValuesWidth = {
      start: 0,
      end: -(this.image.naturalWidth - canvasWidth),
    };
    const stickValuesHeight = {
      start: 0,
      end: -(this.image.naturalHeight - canvasHeight),
    };
    ctx.drawImage(
      this.image,
      stickMapEdgeX
        ? stickValuesWidth[stickMapEdgeX]
        : canvasWidth / 2 - cameraContext.x,
      stickMapEdgeY
        ? stickValuesHeight[stickMapEdgeY]
        : canvasHeight / 2 - cameraContext.y,
    );
  }
}
