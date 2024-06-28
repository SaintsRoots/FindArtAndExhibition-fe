import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "../../services/order.services";

// Initial state
const initialState = {
  orders: [],
  customers: [],
  ordersItems: [],
  totalRevenue: 0,
  loading: false,
  error: null,
};

// Thunk to get orders and customers
export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersService.getordersByArtist();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOrdersCustomer = createAsyncThunk(
  "orders/getOrdersCustomer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersService.getAllCustomer();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const calculateTotalRevenue = (orders) => {
  return orders.reduce((total, order) => total + order.totalPrice, 0);
};

// Slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersItems = action.payload[0]?.items || [];
        state.totalRevenue = calculateTotalRevenue(action.payload);
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // By customer
      .addCase(getOrdersCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.users;
        state.error = null;
      })
      .addCase(getOrdersCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectOrders = (state) => state.orders.ordersItems;
export const selectCustomers = (state) => state.orders.customers;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectTotalRevenue = (state) => state.orders.totalRevenue;

export default orderSlice.reducer;
