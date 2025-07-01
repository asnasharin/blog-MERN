// import axios from "axios";


// const baseURL = "http://localhost:5000/api"

// const token = localStorage.getItem("token") as string;

// const axiosInstance = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: token ? `Bearer ${token}` : "",
//   },
// });

// export default axiosInstance;

// axiosConfig.ts
import axios from "axios";

const baseURL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// ✅ Add request interceptor to dynamically inject token
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ✅ Only set Content-Type when NOT using FormData
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default axiosInstance;
