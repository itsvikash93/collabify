import axios from "axios";

const instance = axios.create({
  baseURL: "https://collabify-h1gc.onrender.com",
});

export default instance;
