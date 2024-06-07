import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/authSlice";
import artsReducer from "./features/arts/artsSlice";
import artistReducer from "./features/artist/artistSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        arts: artsReducer,
        artist: artistReducer,
        cart: cartReducer,
    },
});

export default store;