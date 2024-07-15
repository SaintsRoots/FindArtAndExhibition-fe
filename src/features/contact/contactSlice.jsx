import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "../../services/contact.service";
 
const initialState = {
  contact: [],
  loading: false,
  error: null,
};

export const createMessage = createAsyncThunk(
  "contact/create",
  async ({ message, subject, names, email }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("names", names);
    formData.append("message", message);
    formData.append("subject", subject);
    formData.append("email", email);

    try {
      const response = await contactService.create(formData);
      return response.data?.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
        state.error = null;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const selectAllContact = (state) => state.contact.contact;
export const selectContactloading = (state) => state.contact.loading;
export const selectContactError = (state) => state.contact.error;

export default contactSlice.reducer;
