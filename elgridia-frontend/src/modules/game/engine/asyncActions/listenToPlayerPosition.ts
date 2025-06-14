import { Unsubscribe } from "firebase/database";
import { onValue, ref } from "firebase/database";
import { db } from "src/common/services/firebase";
import { updatePlayerPosition } from "src/modules/game/engine/asyncActions/updatePlayerPosition";
import { Location } from "src/modules/game/engine/types";
import { setPlayerPosition } from "src/store/gameReducer";
import { AppDispatch } from "src/store/types";

export const listenToPlayerPosition =
  () =>
  (dispatch: AppDispatch): Promise<Unsubscribe> => {
    return new Promise((resolve, reject) => {
      const playerRef = ref(db, "GAaIFXnrPJhhq7jtFGQlqIviGlp1/location");

      const unsubscribe = onValue(
        playerRef,
        (snapshot) => {
          const data: Location | null = snapshot.val();
          if (data) {
            console.log(
              "Player position updated from Firebase RTDB (realtime listener):",
              data,
            );
            dispatch(setPlayerPosition({ x: data.x, y: data.y, id: data.id }));
            resolve(unsubscribe);
          } else {
            console.log(
              "Player position does not exist in Firebase RTDB. Initializing it.",
            );
            dispatch(updatePlayerPosition({ x: 0, y: 0, id: 0 }));
          }
        },
        (error) => {
          console.error("Error listening to player position in RTDB:", error);
          reject(error);
          // dispatch(gameSlice.actions.playerPositionError(error.message));
        },
      );
    });
  };
