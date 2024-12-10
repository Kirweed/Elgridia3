import { Sprite } from "./Sprite";

export interface GameObjectConfig {
  x?: number;
  y?: number;
  src: string;
}

class GameObject {
  x: number;
  y: number;
  sprite: Sprite;

  constructor(config: GameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src,
    });
  }
}

export default GameObject;
