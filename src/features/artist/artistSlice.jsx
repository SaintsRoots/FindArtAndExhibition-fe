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

// delete artist

export const deleteArtist = createAsyncThunk(
  "artist/deleteArtist",
  async (id) => {
    await artistService.delete(id);
    const response = await artistService.getAll();
    return response.data.data;
  }
);

export const approveArtist = createAsyncThunk(
  "artist/approveArtist",
  async (id) => {
    await artistService.approve(id);
    const response = await artistService.getAll();
    return response.data.data;
  }
);
export const cancelArtist = createAsyncThunk(
  "artist/cancelArtist",
  async (id) => {
    await artistService.cancel(id);
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
      })
      // Delete artist
      .addCase(deleteArtist.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteArtist.fulfilled, (state, action) => {
        state.artist = action.payload;
        state.error = null;
      })
      .addCase(deleteArtist.rejected, (state, action) => {
        state.error = action.payload;
      })
      // approve artist request
      .addCase(approveArtist.pending, (state) => {
        state.error = null;
      })
      .addCase(approveArtist.fulfilled, (state, action) => {
        state.artist = action.payload;
        state.error = null;
      })
      .addCase(approveArtist.rejected, (state, action) => {
        state.error = action.payload;
      })
      // cancel artist request
      .addCase(cancelArtist.pending, (state) => {
        state.error = null;
      })
      .addCase(cancelArtist.fulfilled, (state, action) => {
        state.artist = action.payload;
        state.error = null;
      })
      .addCase(cancelArtist.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export const selectAllartist = (state) => state.artist.artist;
export const selectartistloading = (state) => state.artist.loading;
export const selectartistError = (state) => state.artist.error;

export default artistSlice.reducer;
