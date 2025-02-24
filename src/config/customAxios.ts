import axios from "axios";
import Cookie from "js-cookie";
export type DataResponse = {
    status: string;
    message: string;
    data?: [];
    errors?: [];
};
const customAxios = axios.create({
    baseURL: "http://localhost:8080",
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
