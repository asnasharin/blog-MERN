import { createSlice } from "@reduxjs/toolkit";
import {
  createBlog,
  getBlogs,
  getSingleBlog,
  editBlog,
  deleteBlog,
} from "../services/blogServices";
import type { Iblog } from "../types/blogTypes";
import type { errorMessage } from "../types/authTypes";

interface BlogState {
  blogs: Iblog[];
  singleBlog: Iblog | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: errorMessage;
}

const initialState: BlogState = {
  blogs: [],
  singleBlog: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: {
    message: "",
    status: null,
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetBlog: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = {
        message: "",
        status: null,
      };
    },
  },
  extraReducers: (builder) => {

    // GET ALL BLOGS
    builder.addCase(getBlogs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = action.payload;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload as errorMessage;
    });

    // GET SINGLE BLOG
    builder.addCase(getSingleBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.singleBlog = action.payload;
    });
    builder.addCase(getSingleBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload as errorMessage;
    });

    // EDIT BLOG
    builder.addCase(editBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = state.blogs.map((blog) =>
        blog._id === action.payload._id ? action.payload : blog
      );
    });
    builder.addCase(editBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload as errorMessage;
    });

    // DELETE BLOG
    builder.addCase(deleteBlog.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload._id);
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload as errorMessage;
    });
  },
});

export const { resetBlog } = blogSlice.actions;
export default blogSlice.reducer;
