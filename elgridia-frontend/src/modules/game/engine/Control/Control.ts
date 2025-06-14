import { defaultControls } from "src/modules/game/engine/data";
import gameManager from "src/modules/game/engine/GameManager/GameManager";
import { setCurrentDirection } from "src/store/gameReducer";

export class Control {
  constructor() {
    document.addEventListener("keydown", (e) => {
      if (Object.keys(defaultControls).includes(e.code)) {
        gameManager.dispatchToRedux(
          setCurrentDirection(defaultControls[e.code]),
        );
      }
    });
    document.addEventListener("keyup", (e) => {
      if (
        gameManager.getCurrentReduxState().game.currentDirection ===
        defaultControls[e.code]
      ) {
        gameManager.dispatchToRedux(setCurrentDirection(null));
      }
    });
  }
}
