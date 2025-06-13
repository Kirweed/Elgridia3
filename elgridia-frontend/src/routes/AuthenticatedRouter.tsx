import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { LobbyView } from "src/modules/lobby/LobbyView";
import { GameView } from "src/modules/game/GameView";
import { store } from "src/store/store";

import { routes } from "./routes";

export const AuthenticatedRootRouter = () => (
  <Routes>
    <Route path={routes.lobby} element={<LobbyView />} />
    <Route
      path={routes.game}
      element={
        <Provider store={store}>
          <GameView />
        </Provider>
      }
    />
    <Route path="*" element={<Navigate to={routes.lobby} />} />
  </Routes>
);
