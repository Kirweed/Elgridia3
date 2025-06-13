import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { db } from "src/common/services/firebase";
import { Location } from "src/modules/game/engine/types";

export const updatePlayerPosition = createAsyncThunk<
  Location | undefined,
  Location
>(
  "game/updatePlayerPosition", // Typ akcji jako string, np. 'game/updatePlayerPosition/pending'
  async (newPosition) => {
    try {
      const playerRef = ref(db, "GAaIFXnrPJhhq7jtFGQlqIviGlp1/location");
      await set(playerRef, newPosition);
      // Zwracamy nową pozycję, która zostanie payloadem akcji 'fulfilled'
      return newPosition;
    } catch (error) {
      console.error("Error updating player position in Firebase RTDB:", error);
      // W przypadku błędu, używamy rejectWithValue do przekazania błędu do akcji 'rejected'
      //return rejectWithValue(error.message);
    }
  },
);
