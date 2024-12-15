import GameObject from "./GameObject";
import { Player } from "./Player";
import { mapEdgeToStick } from "./utils/mapShouldStickToEdge";

interface OverworldMapConfig {
  npcs?: Record<string, GameObject>;
  src: string;
  id: number;
  name: string;
}

export class OverworldMap {
  npcs?: Record<string, GameObject>;
  image: HTMLImageElement;
  id: number;
  name: string;

  constructor(config: OverworldMapConfig) {
    this.npcs = config.npcs;
    this.image = new Image();
    this.image.src = config.src;
    this.id = config.id;
    this.name = config.name;
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
