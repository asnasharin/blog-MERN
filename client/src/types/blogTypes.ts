import type { errorMessage } from "./authTypes";

export interface Iblog {
  _id: string;            
  title: string;
  content: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IinitialState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: errorMessage;
  blog: Iblog[];                
  singleBlog: Iblog | null;     
}
