import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserAPI, loginUserAPI } from './authAPI';

const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await registerUserAPI(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await loginUserAPI(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('accessToken') || null,
    status: 'idle',
    error: null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    initializeUser: (state) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const decodedToken = decodeToken(accessToken);
        if (decodedToken) {
          state.user = {
            id: decodedToken.user_id,
            username: decodedToken.username,
            email: decodedToken.email,
            role: decodedToken.role,
          };
          state.token = accessToken;
          state.isAuthenticated = true;
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const accessToken = action.payload.access;
        const refreshToken = action.payload.refresh;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const decodedToken = decodeToken(accessToken);
        if (decodedToken) {
          state.user = {
            id: decodedToken.user_id,
            username: decodedToken.username,
            email: decodedToken.email,
            role: decodedToken.role,
          };
          state.token = accessToken;
          state.isAuthenticated = true;
        } else {
          state.error = "Failed to decode token.";
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { logout, initializeUser } = authSlice.actions;
export default authSlice.reducer;