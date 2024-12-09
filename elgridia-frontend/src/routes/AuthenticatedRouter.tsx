import { Navigate, Route, Routes } from "react-router-dom";
import { LobbyView } from "src/modules/lobby/LobbyView";

import { routes } from "./routes";

export const AuthenticatedRootRouter = () => (
  <Routes>
    <Route path={routes.lobby} element={<LobbyView />} />
    <Route path="*" element={<Navigate to={routes.lobby} />} />
  </Routes>
);
