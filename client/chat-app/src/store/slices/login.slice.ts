import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/axios";

type AuthState = {
    token: string | null,
    loading: boolean,
    error: string | null
}

// intial state

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null
}

export const loginAction = createAsyncThunk(
    'auth/login',
    async(credentials: {username: string; password: string}, {rejectWithValue}) => {
        try{
            const response = await api.post("auth/login", credentials)
            return response.data.token;
        }catch(error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed")
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginAction.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(loginAction.fulfilled, (state, action) => {
            state.loading = false,
            state.token = action.payload
        })
        .addCase(loginAction.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload as string
        })
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer