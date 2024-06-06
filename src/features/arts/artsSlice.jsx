import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import artsService from "../../services/arts.services";

const initialState = {
  arts: [],
  loading: false,
  currentArt: null,
  error: null,
};

// get all arts

export const getAllArts = createAsyncThunk("arts/getAllArts", async () => {
  const response = await artsService.getAll();
  return response.data.data;
});

// get  all arts by Category

export const getArtsByName = createAsyncThunk(
  "arts/getArtsByName",
  async (name) => {
    const response = await artsService.getByName(name);
    return response.data.data;
  }
);

// create Sliced

export const artsSlice = createSlice({
  name: "arts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All Arts
      .addCase(getAllArts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllArts.fulfilled, (state, action) => {
        state.loading = false;
        state.arts = action.payload;
        state.error = null;
      })
      .addCase(getAllArts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // all arts by Name

      .addCase(getArtsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArtsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArt = action.payload;
        state.error = null;
      })
      .addCase(getArtsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAllarts = (state) => state.arts.arts;
export const selectCurrentArt = (state) => state.arts.currentArt;
export const selectArtsloading = (state) => state.arts.loading;
export const selectArtsError = (state) => state.arts.error;

export default artsSlice.reducer;
