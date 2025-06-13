import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatePlayerPosition } from "src/modules/game/engine/asyncActions/updatePlayerPosition";
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
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePlayerPosition.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlayerPosition.fulfilled, (state) => {
        state.loading = false;
        console.log(
          "Player position update fulfilled (Firebase confirmed). Redux state will be updated by RTDB listener.",
        );
      })
      .addCase(updatePlayerPosition.rejected, (state) => {
        state.loading = false;
        //state.error = action.payload || 'Failed to update player position';
      });
  },
});

export const { setPlayerPosition, setCurrentDirection, setLoading } =
  gameSlice.actions;

export default gameSlice.reducer;
