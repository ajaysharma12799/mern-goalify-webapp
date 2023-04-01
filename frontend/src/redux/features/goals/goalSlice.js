import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalServices";

const initialState = {
  goals: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

// Create New Goal
export const asyncCreateGoal = createAsyncThunk(
  "goal/create",
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user.token;
      return await goalService.createGoal(goal, token);
    } catch (error) {
      console.log(error);
    }
  }
);

// Get Goals
export const asyncGetGoals = createAsyncThunk(
  "goal/getGoals",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user.token;
      return await goalService.getGoals(token);
    } catch (error) {
      console.log(error);
    }
  }
);

// Delete Goal
export const asyncDeleteGoal = createAsyncThunk(
  "goal/deleteGoal",
  async (goalID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.user.token;
      return await goalService.deleteGoal(goalID, token);
    } catch (error) {
      console.log(error);
    }
  }
);

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncCreateGoal.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(asyncCreateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.goals.push(action.payload);
      })
      .addCase(asyncCreateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(asyncGetGoals.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(asyncGetGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.goals = action.payload;
      })
      .addCase(asyncGetGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(asyncDeleteGoal.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(asyncDeleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(asyncDeleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
