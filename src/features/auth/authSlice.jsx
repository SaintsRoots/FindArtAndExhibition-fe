import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../../services/login.service";

const initialState = {
  userData: localStorage.getItem("name")
    ? {
        profile: localStorage.getItem("profile"),
        name: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        isAdmin: localStorage.getItem("isAdmin") === "true",
        isArtist: localStorage.getItem("role") === "Artist" && localStorage.getItem("status") === "approved",
      }
    : null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  isArtist: localStorage.getItem("role") === "Artist" && localStorage.getItem("status") === "approved",
  users: [],
};

export const makeLogin = createAsyncThunk(
  "login/auth",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginService.login({ email, password });
      if (response) {
        localStorage.setItem("identity", response.data.data._id);
        localStorage.setItem("profile", response.data.data.img);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("phone", response.data.data.phone);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", String(response.data.data.isAdmin));
        localStorage.setItem("role", response.data.data.role);
        localStorage.setItem("status", response.data.data.status);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid Username or Password"
      );
    }
  }
);

export const makeSignup = createAsyncThunk(
  "login/signup",
  async ({ name, email, password, img, role }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    if (img) {
      formData.append("img", img);
    }

    try {
      const response = await loginService.signup(formData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// make Update

export const makeUpdate = createAsyncThunk(
  "login/update",
  async (
    {
      id,
      name,
      email,
      password,
      img,
      phone,
      province,
      district,
      sector,
      street,
    },
    { rejectWithValue }
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("province", province);
    formData.append("district", district);
    formData.append("sector", sector);
    formData.append("street", street);
    if (img) {
      formData.append("img", img);
    }

    try {
      const response = await loginService.update(id, formData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

// get Single user

export const makeGetSingleUser = createAsyncThunk(
  "login/getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await loginService.getSingle(id);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue("Failed to get user.");
    }
  }
);
export const logout = createAsyncThunk(
  "login/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("profile");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("role");
      localStorage.removeItem("status");
      localStorage.removeItem("identity");
      // router.push(/);

      window.location.href = "/";

      return true;
    } catch (error) {
      return rejectWithValue("Failed to logout.");
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.isAdmin = action.payload.isAdmin;
        state.isArtist = action.payload.role === "Artist" && action.payload.status === "approved";
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(makeLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.isArtist = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.isArtist = false;
      })
      .addCase(makeSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeSignup.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isAdmin = action.payload.isAdmin;
        state.isArtist = action.payload.role === "Artist";
        state.loading = false;
      })
      .addCase(makeSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // make update
      .addCase(makeUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeUpdate.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(makeUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // make update
      .addCase(makeGetSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeGetSingleUser.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(makeGetSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectLoginStatus = (state) => state.login.loading;
export const selectSingleUser = (state) => state.login.users;
export const selectLoginError = (state) => state.login.error;
export const getIsAuthenticated = (state) => state.login.isAuthenticated;
export const getIsAdmin = (state) => state.login.isAdmin;
export const getIsArtist = (state) => state.login.isArtist;

export default loginSlice.reducer;
