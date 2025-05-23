import axios from "axios";
import Cookie from "js-cookie";
export type DataResponse = {
    status: string;
    message: string;
    data?: [];
    errors?: [];
};
const customAxios = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BASE_API_URL : "http://localhost:8080",
    timeout: 5000,
});
customAxios.interceptors.request.use((config) => {
    const token = Cookie.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default customAxios;
