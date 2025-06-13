import { Controls } from "src/modules/game/engine/types";

export const defaultControls: Record<KeyboardEvent["code"], Controls> = {
  ArrowUp: Controls.MOVE_UP,
  ArrowDown: Controls.MOVE_DOWN,
  ArrowRight: Controls.MOVE_RIGHT,
  ArrowLeft: Controls.MOVE_LEFT,
  KeyW: Controls.MOVE_UP,
  KeyS: Controls.MOVE_DOWN,
  KeyD: Controls.MOVE_RIGHT,
  KeyA: Controls.MOVE_LEFT,
};
