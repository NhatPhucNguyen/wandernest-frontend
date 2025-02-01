import customAxios from "@/config/customAxios";
import axios from "axios";

type LoginInput = {
    username: string;
    password: string;
};
type RegisterInput = LoginInput & {
    email: string;
};
export const login = async (input: LoginInput) => {
    try {
        const { data } = await customAxios.post<{ token: string }>(
            "/api/auth/login",
            input
        );
        console.log(data.token);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { errorMessage: error.response?.data.message };
        }
        throw error;
    }
};
export const register = async (input: RegisterInput) => {
    try {
        await customAxios.post("/api/auth/register", input);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { errorMessage: error.response?.data.message };
        }
        throw error;
    }
};
