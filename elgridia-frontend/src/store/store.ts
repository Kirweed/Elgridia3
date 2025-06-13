import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import gameReducer from "./gameReducer";
import { AppDispatch, RootState } from "./types";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type AppRootState = RootState;
export const useAppDispatch: () => AppDispatch = useDispatch;
