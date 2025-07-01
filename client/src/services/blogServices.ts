import type { Iblog } from "../types/blogTypes";
import api from "../API/Api"
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";



export const createBlog = async (blogData: FormData): Promise<any> => {
  try {

    const token = localStorage.getItem("token"); 

    if (!token) {
      throw new Error("No token found. User might not be logged in.");
    }
    const { data } = await api.post("/blog/create", blogData);
    return data;
  } catch (error: any) {
    console.log(error);
    return error.response?.data || { success: false, message: "Unexpected error" };
  }
};


export const getBlogs = createAsyncThunk (
    "blog/get",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/blog/getBlogs")
            return response.data.data
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
