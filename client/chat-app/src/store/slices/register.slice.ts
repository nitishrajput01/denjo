import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

type RegisterState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};

export const registerAction = createAsyncThunk(
  "auth/register",
  async (
    credentials: {
      name: string;
      email: string;
      username: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      await api.post("/auth/register", credentials);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;