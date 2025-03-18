import customAxios from "@/config/customAxios";
import MockAdapter from "axios-mock-adapter";
import Cookie from "js-cookie";
import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { login, logout, register, validateToken } from "../AuthAPI";

vi.mock("js-cookie", () => {
    return {
        __esModule: true,
        default: {
            set: vi.fn(),
            get: vi.fn(),
            remove: vi.fn(),
        },
    };
});
vi.mock("jwt-decode", () => ({
    jwtDecode: () => ({ sub: "mocked-username" }),
}));
describe("AuthAPI", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(customAxios);
    });

    afterEach(() => {
        mock.reset();
    });

    describe("login", () => {
        it("should login successfully and set cookies", async () => {
            const token = "mocked-jwt-token";
            const username = "mocked-username";
            mock.onPost("/api/auth/login").reply(200, { token });
    
            await login({ username: "testuser", password: "password" });
    
            expect(Cookie.set).toHaveBeenCalledWith("token", token, {
                expires: 1,
                sameSite: "Strict",
                secure: true,
            });
            expect(Cookie.set).toHaveBeenCalledWith("username", username, {
                expires: 1,
                sameSite: "Strict",
                secure: true,
            });
        });
    
        it("should return an error message on login failure", async () => {
            const errorMessage = "Invalid credentials";
            mock.onPost("/api/auth/login").reply(400, {
                message: errorMessage,
            });
    
            const result = await login({
                username: "testuser",
                password: "password",
            });
    
            expect(result).toEqual({ errorMessage });
        });
    });

    describe("register", () => {
        it("should register successfully", async () => {
            mock.onPost("/api/auth/register").reply(200);

            await register({
                username: "testuser",
                password: "password",
                email: "test@example.com",
            });

            expect(mock.history.post.length).toBe(1);
        });

        it("should return an error message on register failure", async () => {
            const errorMessage = "Registration failed";
            mock.onPost("/api/auth/register").reply(400, {
                message: errorMessage,
            });

            const result = await register({
                username: "testuser",
                password: "password",
                email: "test@example.com",
            });

            expect(result).toEqual({ errorMessage });
        });
    });

    describe("validateToken", () => {
        it("should validate token successfully", async () => {
            const token = "mocked-jwt-token";
            const username = "mocked-username";
            (Cookie.get as Mock).mockReturnValue(token);
            mock.onGet("/api/auth/validate-token").reply(200);

            const result = await validateToken();

            expect(result).toBe(true);
            expect(Cookie.set).toHaveBeenCalledWith("username", username);
        });

        it("should return false and remove cookies on validation failure", async () => {
            (Cookie.get as Mock).mockReturnValue("mocked-jwt-token");
            mock.onGet("/api/auth/validate-token").reply(401);

            const result = await validateToken();

            expect(result).toBe(false);
            expect(Cookie.remove).toHaveBeenCalledWith("token");
            expect(Cookie.remove).toHaveBeenCalledWith("username");
        });

        it("should return false if no token is found", async () => {
            (Cookie.get as Mock).mockReturnValue(undefined);

            const result = await validateToken();

            expect(result).toBe(false);
        });
    });

    describe("logout", () => {
        it("should logout successfully and remove cookies", async () => {
            mock.onPost("/api/auth/logout").reply(200);

            await logout();

            expect(Cookie.remove).toHaveBeenCalledWith("token");
            expect(Cookie.remove).toHaveBeenCalledWith("username");
        });

        it("should handle logout failure gracefully", async () => {
            mock.onPost("/api/auth/logout").reply(500);

            await logout();

            expect(Cookie.remove).toHaveBeenCalledWith("token");
            expect(Cookie.remove).toHaveBeenCalledWith("username");
        });
    });
});
