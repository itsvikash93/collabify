import axios from "axios";

const instance = axios.create({
  baseURL: "https://collabify-h1gc.onrender.com/api",
  // baseURL: "http://localhost:3000/api",
});

export default instance;
