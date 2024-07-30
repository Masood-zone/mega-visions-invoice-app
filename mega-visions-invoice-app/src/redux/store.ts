import { storeApi } from "./api";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import rootReducer from "./reducer";

const persistConfig = {
  key: "megavisions-shop",
  storage: createWebStorage("local"),
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    [storeApi.reducerPath]: storeApi.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(storeApi.middleware),
});

export const persistor = persistStore(store);
export default store;

export const useDispatch = (): ReduxDispatch =>
  useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/** Types */
export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
