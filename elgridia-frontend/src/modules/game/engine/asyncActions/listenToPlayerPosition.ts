import { onValue, ref } from "firebase/database";
import { db } from "src/common/services/firebase";
import { updatePlayerPosition } from "src/modules/game/engine/asyncActions/updatePlayerPosition";
import { setPlayerPosition } from "src/store/gameReducer";
import { AppDispatch } from "src/store/types";

export const listenToPlayerPosition = () => (dispatch: AppDispatch) => {
  const playerRef = ref(db, "GAaIFXnrPJhhq7jtFGQlqIviGlp1/location");

  const unsubscribe = onValue(
    playerRef,
    (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(
          "Player position updated from Firebase RTDB (realtime listener):",
          data,
        );
        dispatch(setPlayerPosition({ x: data.x, y: data.y }));
      } else {
        console.log(
          "Player position does not exist in Firebase RTDB. Initializing it.",
        );
        dispatch(updatePlayerPosition({ x: 0, y: 0 }));
      }
    },
    (error) => {
      console.error("Error listening to player position in RTDB:", error);
      // dispatch(gameSlice.actions.playerPositionError(error.message));
    },
  );
  return unsubscribe;
};
