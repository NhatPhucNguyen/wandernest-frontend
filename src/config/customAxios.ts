import axios from "axios";
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

export default customAxios;
