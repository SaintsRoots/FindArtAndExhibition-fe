import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../../services/login.service";

const initialState = {
  userData: localStorage.getItem("name")
    ? {
        profile: localStorage.getItem("profile"),
        name: localStorage.getItem("email"),
        isAdmin: localStorage.getItem("isAdmin") === "true",
      }
    : null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
};

export const makeLogin = createAsyncThunk(
  "login/auth",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginService.login({ email, password });
      if (response) {
        localStorage.setItem("profile", response.data.data.profile);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAdmin", String(response.data.data.isAdmin));
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Invalid Username or Password"
      );
    }
  }
);
// Signup
export const makeSignup = createAsyncThunk(
  "login/signup",
  async ({ name, email, password, profile, role }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    if (profile) {
      formData.append("profile", profile);
    }

    try {
      const response = await loginService.signup(formData);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const logout = createAsyncThunk(
  "login/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("profile");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
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
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(makeLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isAdmin = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      })
      .addCase(makeSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeSignup.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
      })
      .addCase(makeSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectLoginStatus = (state) => state.login.loading;
export const selectLoginError = (state) => state.login.error;
export const getIsAuthenticated = (state) => state.login.isAuthenticated;
export const getIsAdmin = (state) => state.login.isAdmin;

export default loginSlice.reducer;
