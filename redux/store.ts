import { configureStore } from '@reduxjs/toolkit';
import keyboardReducer from './feature/keyboard/keyboardSlice';
import authReducer from './feature/user/userSlice';

// FIXME: Fix user state
// TODO: Add notices state
export const store = configureStore({
  reducer: {
    auth: authReducer,
    keyboard: keyboardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
