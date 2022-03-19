import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import settingsReducer from "./slices/settings.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    settings: settingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
