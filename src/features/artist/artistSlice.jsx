import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import artistService from "../../services/artist.service";

const initialState = {
  artist: [],
  loading: false,
  error: null,
};

// get all artist

export const getAllartist = createAsyncThunk(
  "artist/getAllartist",
  async () => {
    const response = await artistService.getAll();
    return response.data.data;
  }
);

// create Sliced

export const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All artist
      .addCase(getAllartist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllartist.fulfilled, (state, action) => {
        state.loading = false;
        state.artist = action.payload;
        state.error = null;
      })
      .addCase(getAllartist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllartist = (state) => state.artist.artist;
export const selectartistloading = (state) => state.artist.loading;
export const selectartistError = (state) => state.artist.error;

export default artistSlice.reducer;
