import { Animations } from "src/modules/game/engine/types";

import { Player } from "./Player";
import { mapEdgeToStick } from "./utils/mapShouldStickToEdge";

interface GameObjectForSprite {
  x: number;
  y: number;
}

interface SpriteConfig {
  animations?: Animations;
  currentAnimation?: string;
  src: string;
  gameObject: GameObjectForSprite;
  animationFrameLimit?: number;
}

export class Sprite {
  animations: Animations;
  currentAnimation: string;
  currentAnimationFrame: number;
  image: HTMLImageElement;
  isLoaded: boolean;
  gameObject: GameObjectForSprite;
  animationFrameLimit: number;
  animationFrameProgress: number;

  constructor(config: SpriteConfig) {
    this.isLoaded = false;

    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-left": [[0, 1]],
      "idle-right": [[0, 2]],
      "idle-up": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-left": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-right": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-up": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation ?? "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  udpateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress--;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame++;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  setAnimation(key: string) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    cameraContext: Player,
    canvasWidth: number,
    canvasHeight: number,
    mapImage: HTMLImageElement,
  ) {
    const stickMapEdgeX = mapEdgeToStick(
      mapImage.naturalWidth,
      cameraContext.x,
      canvasWidth,
    );
    const stickMapEdgeY = mapEdgeToStick(
      mapImage.naturalHeight,
      cameraContext.y,
      canvasHeight,
    );
    const stickValuesWidth = {
      start: this.gameObject.x,
      end: this.gameObject.x - (mapImage.naturalWidth - canvasWidth),
    };
    const stickValuesHeight = {
      start: this.gameObject.y - 16,
      end: this.gameObject.y - 16 - (mapImage.naturalHeight - canvasHeight),
    };
    const x = stickMapEdgeX
      ? stickValuesWidth[stickMapEdgeX]
      : this.gameObject.x + canvasWidth / 2 - cameraContext.x;
    const y = stickMapEdgeY
      ? stickValuesHeight[stickMapEdgeY]
      : this.gameObject.y - 16 + canvasHeight / 2 - cameraContext.y;

    const [frameX, frameY] = this.frame;

    if (this.isLoaded) {
      ctx.drawImage(this.image, frameX * 32, frameY * 48, 32, 48, x, y, 32, 48);
    }

    this.udpateAnimationProgress();
  }
}
