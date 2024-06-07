import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../../services/cart.services";

const initialState = {
  cart: [],
  loading: false,
  currentArt: null,
  error: null,
};

// Add to cart thunk
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = { quantity };
      console.log("Adding to cart service:", productId, data);
      const response = await cartService.addTocart(productId, data);
      return response.data.data;
    } catch (error) {
      if (error.response.status === 400) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        error.response?.data?.message || "Check your Internet connection"
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
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllcart = (state) => state.cart.cart;
export const selectCurrentArt = (state) => state.cart.currentArt;
export const selectcartloading = (state) => state.cart.loading;
export const selectcartError = (state) => state.cart.error;

export default cartSlice.reducer;
