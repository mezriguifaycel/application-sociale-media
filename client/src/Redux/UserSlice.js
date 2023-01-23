import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = { headers: { token: localStorage.getItem("token") } };

export const SignUp = createAsyncThunk(
  "user/SignUp",
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/users/", newUser);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
      );
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/users/Login", user);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors
      );
    }
  }
);
//...........get all user....
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/users/", config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// //Delete user
export const DeleteUsers = createAsyncThunk(
  "User/DeleteUsers",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    isLoading: false,
    RegisterErros: null,
    LoginErrors: null,
    token: localStorage.getItem("token"),
    isAuth: Boolean(localStorage.getItem("isAuth")),
    users: [],
  },
  reducers: {
    ClearErros: (state) => {
      state.LoginErrors = null;
      state.RegisterErros = null;
    },
    LogOut: (state) => {
      localStorage.clear();
      state.user = {};
      state.isAuth = false;
      state.token = null;
    },
  },
  extraReducers: {
    /*SignUp */
    [SignUp.pending]: (state) => {
      state.isLoading = true;
    },
    [SignUp.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
    },
    [SignUp.rejected]: (state, { type, payload }) => {
      state.RegisterErros = payload;
    },
    /*signIn */

    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      state.user = payload.isfound;
      state.token = payload.token;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(payload.isfound));
      localStorage.setItem("token", payload.token);
      localStorage.setItem("isAuth", true);
    },
    [signIn.rejected]: (state, { type, payload }) => {
      state.LoginErrors = payload;
    },
    /*getAllUsers */
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      state.users = payload;
    },
    [getAllUsers.rejected]: (state, { type, payload }) => {
      state.Errors = payload;
    },
    //Delete user........................

    [DeleteUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [DeleteUsers.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      const deleted = state.users.filter(
        (user) =>user._id !== payload.DeletedUsers._id
      );
      state.users = deleted;
    },
    [DeleteUsers.rejected]: (state, { type, payload }) => {
      state.Errors = payload;
    },
  },
});

export default UserSlice.reducer;
export const { LogOut, ClearErros } = UserSlice.actions;
