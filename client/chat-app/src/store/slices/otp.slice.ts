import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

type OtpState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: OtpState = {
  loading: false,
  error: null,
  success: false,
};

export const verifyOtpAction = createAsyncThunk(
  "auth/verifyOtp",
  async (
    credentials: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      await api.post("/auth/verify-otp", credentials);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtpAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtpAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
