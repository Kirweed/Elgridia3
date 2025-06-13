import { defaultControls } from "src/modules/game/engine/data";
import gameManager from "src/modules/game/engine/GameManager/GameManager";
import { setCurrentDirection } from "src/store/gameReducer";

export class Control {
  constructor() {
    document.addEventListener("keydown", (e) => {
      console.log(e.code, defaultControls);
      if (Object.keys(defaultControls).includes(e.code)) {
        console.log(e.code, "xxxxxxd");
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
