import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = { headers: { token: localStorage.getItem("token") } };

export const AddPost = createAsyncThunk(
  "post/AddPost",
  async (newPost, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/api/posts/", newPost, config);
      dispatch(getAllPosts());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/posts/");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// getMyPosts
export const getMyPosts = createAsyncThunk(
  "post/getMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/posts/myPosts", config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// //Delete post
export const DeletePosts = createAsyncThunk(
  "Post/DeletePosts",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/posts/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

//Update post
export const UpdatePosts = createAsyncThunk(
  "Post/UpdatePosts",
  async (updatedPost, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/posts/${updatedPost._id}`,
        updatedPost,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: false,
    post: {},
    posts: [],
    Errors: null,
    myPosts: [],
  },

  reducers: {},

  extraReducers: {
    /*add postes */
    [AddPost.pending]: (state) => {
      state.isLoading = true;
    },
    [AddPost.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      state.post = payload;
    },
    [AddPost.rejected]: (state, { type, payload }) => {
      state.Errors = payload;
    },
    /*getliste des postes */
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },
    [getAllPosts.rejected]: (state, { type, payload }) => {
      state.Errors = payload;
    },
    //getMyPosts
    [getMyPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyPosts.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      state.myPosts = payload;
    },
    [getMyPosts.rejected]: (state, { type, payload }) => {
      state.Errors = payload;
    },

    //Deletepost........................

    [DeletePosts.pending]: (state) => {
      state.isLoading = true;
    },
    [DeletePosts.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      const deleted = state.posts.filter(
        (post) => post._id !== payload.DeletedPosts._id
      );
      state.posts = deleted;
    },
    [DeletePosts.rejected]: (state, { type, payload }) => {
      state.Errors = payload;
    },

    //UpdatePosts........................
    [UpdatePosts.pending]: (state) => {
      state.isLoading = true;
    },
    [UpdatePosts.fulfilled]: (state, { type, payload }) => {
      state.isLoading = false;
      state.posts = state.posts.map((post) =>
        post._id === payload._id ? { ...post, ...payload } : post
      );
    },
    [UpdatePosts.rejected]: (state, { type, payload }) => {
      state.Errors = payload;
    },
  },
});

export default PostSlice.reducer;
