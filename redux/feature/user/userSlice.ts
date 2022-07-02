import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RootState } from '../../store';
import type { User } from '../../../types/userAndRoles';
// import * as env from 'react-native-dotenv';

interface AuthState {
  booting: boolean;
  bootingError: string | null;
  loading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

type StoredAuthState = Pick<AuthState, 'token' | 'user'>;

const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { error, data } = await fetch(`${process.env['API_BASE']}/users/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => res.json());

      if (error) throw new Error(error);

      await AsyncStorage.setItem('auth', JSON.stringify(data));
      return data as StoredAuthState;
    } catch (err) {
      throw new Error((err as Error).message ?? 'Error in login thunk');
    }
  }
);

const register = createAsyncThunk(
  'auth/register',
  async ({
    email,
    name,
    password,
    phone,
  }: Pick<User, 'email' | 'phone' | 'name'> & { password: string }) => {
    try {
      const { error, data } = await fetch(`${process.env['API_BASE']}/users/register`, {
        method: 'POST',
        body: JSON.stringify({ email, name, password, phone }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => res.json());
      if (error) throw new Error(error);

      await AsyncStorage.setItem('auth', JSON.stringify(data));
      return data as StoredAuthState;
    } catch (err) {
      throw new Error((err as Error).message ?? 'Error in register thunk');
    }
  }
);

const logout = createAsyncThunk('auth/logout', () => AsyncStorage.removeItem('auth'));

const loadFomStorage = createAsyncThunk('auth/load', async () => {
  const storedAuthState = await AsyncStorage.getItem('auth');

  if (!storedAuthState || !JSON.parse(storedAuthState)) {
    throw Error('Login to continue');
  }

  return JSON.parse(storedAuthState) as StoredAuthState;
});

const initialState: AuthState = {
  booting: false,
  bootingError: null,
  loading: false,
  user: null,
  token: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
      state.user = null;
      state.token = null;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(register.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.token = null;
    });
    builder.addCase(logout.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });

    builder.addCase(loadFomStorage.fulfilled, (state, action) => {
      state.booting = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loadFomStorage.pending, (state) => {
      state.error = null;
      state.booting = false;
    });
    builder.addCase(loadFomStorage.rejected, (state, action) => {
      state.booting = false;
      state.bootingError = action.error.message ?? 'Booting Error';
    });
  },
});

export { login, logout, register, loadFomStorage };

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthBooting = (state: RootState) => state.auth.booting;

export default authSlice.reducer;
