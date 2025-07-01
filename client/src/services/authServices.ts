import type { userData, LoginCredentials } from "../types/authTypes";
import api from "../API/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userdata: userData, thunkAPI) => {
    try {
      const response = await api.post("/register", userdata);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      let payload;
      if (axiosError.message === "Network Error") {
        payload = {
          message: axiosError.message,
          status: 404,
        };
      } else {
        const Error = (axiosError?.response?.data as { message: string })
          .message;
        payload = {
          message: Error,
          status: axiosError.status,
        };
      }
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData: LoginCredentials, thunkAPI) => {
    try {
      const response = await api.post("/login", formData);

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      let payload;
      if (axiosError.message === "Network Error") {
        payload = {
          message: axiosError.message,
          status: 404,
        };
      } else {
        const Error = (axiosError?.response?.data as { message: string })
          .message;
        payload = {
          message: Error,
          status: axiosError.status,
        };
      }
      return thunkAPI.rejectWithValue(payload);
    }
  }
);
