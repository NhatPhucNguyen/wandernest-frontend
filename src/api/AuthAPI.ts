import customAxios from "@/config/customAxios";
import axios from "axios";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
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
        console.log(data);
        Cookie.set("token", data.token, {
            expires: 1,
            sameSite: "Strict",
            secure: true,
        });
        const username = jwtDecode(data.token).sub;
        if (username) {
            Cookie.set("username", username, {
                expires: 1,
                sameSite: "Strict",
                secure: true,
            });
        }
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

export const validateToken = async () => {
    try {
        const token = Cookie.get("token");
        if (!token) {
            return false;
        }
        await customAxios.get("/api/auth/validate-token");
        Cookie.set("username", jwtDecode(token).sub!);
        return true;
    } catch {
        Cookie.remove("token");
        Cookie.remove("username");
        return false;
    }
};

export const logout = async () => {
    try {
        await customAxios.post("/api/auth/logout");
        Cookie.remove("token");
        Cookie.remove("username");
    } catch {
        Cookie.remove("token");
        Cookie.remove("username");
    }
};
