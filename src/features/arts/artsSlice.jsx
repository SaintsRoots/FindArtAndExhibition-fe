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

export const getAllArtsByOwner = createAsyncThunk("arts/owner", async () => {
  const response = await artsService.getAlllogged();
  return response.data.data;
});

export const createArts = createAsyncThunk(
  "arts/create",
  async (
    { name, price, description, available_arts, category, image },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("available_arts", available_arts);
    formData.append("category", category);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await artsService.create(formData);
      const response = await artsService.getAlllogged();
      return response.data?.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// updateArts

export const updateArts = createAsyncThunk(
  "arts/update",
  async (
    { id, name, price, description, available_arts, category, image },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("available_arts", available_arts);
    formData.append("category", category);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await artsService.update(id, formData);
      const response = await artsService.getAlllogged();
      return response.data?.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// delete the existing art

export const deleteArts = createAsyncThunk(
  "arts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await artsService.delete(id);
      const response = await artsService.getAlllogged();
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Check your Internet connection"
      );
    }
  }
);

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

      // by owner
      .addCase(getAllArtsByOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllArtsByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.arts = action.payload;
        state.error = null;
      })
      .addCase(getAllArtsByOwner.rejected, (state, action) => {
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
      })

      // create arts
      .addCase(createArts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArts.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
        state.error = null;
      })
      .addCase(createArts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete arts
      .addCase(deleteArts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArts.fulfilled, (state, action) => {
        state.loading = false;
        state.arts = action.payload;
        state.error = null;
      })
      .addCase(deleteArts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update Arts
      .addCase(updateArts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArts.fulfilled, (state, action) => {
        state.loading = false;
        state.arts = action.payload;
        state.error = null;
      })
      .addCase(updateArts.rejected, (state, action) => {
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
