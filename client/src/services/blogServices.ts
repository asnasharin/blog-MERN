import type { Iblog } from "../types/blogTypes";
import api from "../API/Api"
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";


export const createBlog = async (blog: Iblog) => {
   try {
    const { data } = await api.post("/create", blog)
    return data;
    } catch (error) {
    console.log(error)
    return error
   }
}


export const getBlogs = createAsyncThunk (
    "blog/get",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/blog")
            return response.data
        } catch (error) {
          const axiosError = error as AxiosError  
          const Error = (axiosError?.response?.data as { message: string }).message;
          const payload = {
           message: Error,
           status: axiosError.status,
        };
        return thunkAPI.rejectWithValue(payload);
        }
    }
) 


export const getSingleBlog = createAsyncThunk(
  "blog/getSingle",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);


export const editBlog = createAsyncThunk(
  "blog/edit",
  async ({ id, updatedBlog }: { id: string; updatedBlog: Iblog }, thunkAPI) => {
    try {
      const response = await api.put(`/blog/${id}`, updatedBlog);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await api.delete(`/blog/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const Error = (axiosError?.response?.data as { message: string }).message;
      const payload = {
        message: Error,
        status: axiosError.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);
