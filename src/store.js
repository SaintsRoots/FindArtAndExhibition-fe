import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/authSlice";
import artsReducer from "./features/arts/artsSlice";
import artistReducer from "./features/artist/artistSlice";
import cartReducer from "./features/cart/cartSlice";
import ordersReducers from "./features/orders/ordersSlice";
import contactReducers from "./features/contact/contactSlice";
import chatReducers from "./features/chats/chartSlice";

const store = configureStore({
    reducer: {
        login: loginReducer,
        arts: artsReducer,
        artist: artistReducer,
        cart: cartReducer,
        orders: ordersReducers,
        contact: contactReducers,
        chat: chatReducers,
    },
});

export default store;