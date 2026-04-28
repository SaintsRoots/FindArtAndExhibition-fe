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
export const getAllOrders = createAsyncThunk(
  "orders/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersService.getAll();
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

export const makeOrders = createAsyncThunk(
  "orders/makeOrders ",
  async ({ cartId, shippingAddress }, { rejectWithValue }) => {
    try {
      const data = {
        shippingAddress,
        successUrl: "https://artfinderandexhibition.netlify.app/",
        cancelUrl: "https://artfinderandexhibition.netlify.app/fails",
      };
      const response = await ordersService.create(cartId, data);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const completePayment = createAsyncThunk(
  "orders/approvesPayment",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await ordersService.aprovePayment(orderId);
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
        state.orders = action.payload;
        state.totalRevenue = calculateTotalRevenue(action.payload);
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // all orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersItems = action.payload[0]?.items || [];
        state.orders = action.payload;
        state.totalRevenue = calculateTotalRevenue(action.payload);
        state.error = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
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
      })
      // make orders
      .addCase(makeOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(makeOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // complete payment
      .addCase(completePayment.pending, (state) => {
        state.error = null;
      })
      .addCase(completePayment.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(completePayment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectOrders = (state) => state.orders.orders || [];
export const selectCustomers = (state) => state.orders.customers;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectTotalRevenue = (state) => state.orders.totalRevenue;

export default orderSlice.reducer;
