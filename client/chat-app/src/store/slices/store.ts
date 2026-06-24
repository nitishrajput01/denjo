import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../slices/login.slice";
import registerReducer from "../slices/register.slice";
import otpReducer from "../slices/otp.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        otp: otpReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch