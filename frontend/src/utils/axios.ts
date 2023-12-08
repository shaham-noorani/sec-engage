import axios from "axios";

const API_URL = process.env.PROD ? "/api" : "http://localhost:3001/api";

export const AxiosPrivateClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("idToken")}`,
  },
});

export const AxiosRefreshPrivateClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
  },
});
