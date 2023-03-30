import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  message: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
};

// Register User
export const asyncRegisterUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkAPI) => {
    try {
      return await authService.registerUser(user);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
export const asyncLoginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      return await authService.loginUser(user);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User
export const asyncLogoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logoutUser();
  } catch (error) {
    const message = error?.response?.data?.message;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncRegisterUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(asyncRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(asyncLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(asyncLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(asyncLogoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
