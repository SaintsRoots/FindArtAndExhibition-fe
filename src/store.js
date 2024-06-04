import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/authSlice";
import artsReducer from "./features/arts/artsSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        arts: artsReducer,
    },
});

export default store;