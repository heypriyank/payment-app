import axios from "axios";

// Defining base API URL for global use
export const baseURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Exporting for global use

export default axiosInstance;
