import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../../services/cart.services";

const initialState = {
  cart: [],
  loading: false,
  totalItems: 0,
  totalPrice: 0,
  error: null,
};

// Add to cart thunk
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = { quantity };
      const response = await cartService.addTocart(productId, data);
      return response.data.data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.error || "Check your Internet connection"
      );
    }
  }
);

// get cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getAllCart();
      return {
        items: response.data.items,
        totalPrice: response.data.totalPrice,
        totalItems: response.data.totalItems,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Check your Internet connection"
      );
    }
  }
);

// remove from cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      await cartService.removeFromCart(productId);
      return { productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Check your Internet connection"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [...state.cart, action.payload];
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.totalItems = action.payload.totalItems;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // remove
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = state.cart.filter(
          (item) => item.productId !== action.payload.productId
        );
        state.error = null;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllcart = (state) => state.cart.cart;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalItems = (state) => state.cart.totalItems;
export const selectcartloading = (state) => state.cart.loading;
export const selectcartError = (state) => state.cart.error;

export default cartSlice.reducer;
