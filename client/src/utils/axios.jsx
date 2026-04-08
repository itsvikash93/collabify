import axios from "axios";

const instance = axios.create({
  baseURL: "https://collabify-h1gc.onrender.com/api",
  // baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("collabifyToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
