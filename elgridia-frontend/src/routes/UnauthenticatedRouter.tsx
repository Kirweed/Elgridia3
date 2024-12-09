import { Routes, Route, Navigate } from "react-router-dom";
import { HomeView } from "src/modules/home/HomeView";

import { routes } from "./routes";

export const UnauthenticatedRouter = () => (
  <Routes>
    <Route path={routes.home} element={<HomeView />} />
    <Route path="*" element={<Navigate to={routes.home} />} />
  </Routes>
);
