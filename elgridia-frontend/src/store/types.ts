import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { GameState } from "src/modules/game/engine/types";

export interface RootState {
  game: GameState;
}

export type AppDispatch = ThunkDispatch<RootState, undefined, UnknownAction>;
