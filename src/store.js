import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/authSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});

export default store;