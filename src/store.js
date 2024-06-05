import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/authSlice";
import artsReducer from "./features/arts/artsSlice";
import artistReducer from "./features/artist/artistSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        arts: artsReducer,
        artist: artistReducer,
    },
});

export default store;