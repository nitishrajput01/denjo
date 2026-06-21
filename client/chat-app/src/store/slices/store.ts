import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../slices/login.slice";
import registerReducer from "../slices/register.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch