import axios from "./axios";
import { baseURL } from "./axios";

export const getRequest = async (url) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(baseURL + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const postRequest = async (url, data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(baseURL + url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

