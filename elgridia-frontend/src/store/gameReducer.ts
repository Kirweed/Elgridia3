import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Controls, GameState, Location } from "src/modules/game/engine/types";

const initialState: GameState = {
  location: { x: 0, y: 0, id: 0 },
  loading: true,
  currentDirection: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerPosition: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
      state.loading = false;
    },
    setCurrentDirection: (state, action: PayloadAction<Controls | null>) => {
      state.currentDirection = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log(action.payload);
      state.loading = action.payload;
    },
  },
});

export const { setPlayerPosition, setCurrentDirection, setLoading } =
  gameSlice.actions;

export default gameSlice.reducer;
