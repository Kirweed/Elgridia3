export type Animations = Record<string, number[][]>;

export enum Controls {
  MOVE_UP = "up",
  MOVE_DOWN = "down",
  MOVE_RIGHT = "right",
  MOVE_LEFT = "left",
}

export interface Location {
  x: number;
  y: number;
  id: number;
}

export interface GameState {
  location: Location;
  loading: boolean;
  currentDirection: Controls | null;
}
