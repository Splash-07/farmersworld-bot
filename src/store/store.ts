import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataReducer from "./slices/data.slice";
import settingsReducer from "./slices/settings.slice";
import endpointReducer from "./slices/endpoint.slice";

const settingsPersistConfig = {
  key: "settings",
  storage,
  blacklist: ["loggerArray", "updateData", "triggerNextAction"],
};
const endpointPersistConfig = {
  key: "endpoint",
  storage,
};
const reducers = combineReducers({
  data: dataReducer,
  endpoint: persistReducer(endpointPersistConfig, endpointReducer),
  settings: persistReducer(settingsPersistConfig, settingsReducer),
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
