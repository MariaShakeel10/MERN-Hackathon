import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null, // Added error state
};

// ✅ Fix: Register User using `createAsyncThunk`
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      // console.log("Sending registration request with data:", formData);
      const response = await axios.post(`${api_url}/auth/register`, formData, {
        withCredentials: true,
      });
      // console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// ✅ Fix: Login User using `createAsyncThunk`
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Sending login request with data:", formData);
      const response = await axios.post(`${api_url}/auth/login`, formData, {
        withCredentials: true,
      });
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// logout
export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Sending login request with data:", formData);
      const response = await axios.post(
        `${api_url}/auth/logout`,
        {},

        { withCredentials: true }
      );
      console.log("Login response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// checkAuth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${api_url}/auth/check-auth`, {
        withCredentials: true,
      }); // Make sure the URL is correct!
      console.log("Check Auth Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("CheckAuth Failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || { success: false }
      );
    }
  }
);

// authSlice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
