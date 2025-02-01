import { z } from "zod";

export const registerFormSchema = z
    .object({
        username: z
            .string()
            .min(3, {
                message: "User name must be more than 3 characters",
            })
            .max(20, {
                message: "User name must be less than 20 characters",
            })
            .regex(/^[a-zA-Z0-9._]+$/, {
                message:
                    "User name can only contain letters, numbers, dots, and underscores",
            })
            .regex(/^(?!.*[_.]{2})/, {
                message:
                    "User name cannot contain consecutive dots or underscores",
            })
            .regex(/^(?![_.])/, {
                message: "User name cannot start with a dot or underscore",
            })
            .regex(/[^_.]$/, {
                message: "User name cannot end with a dot or underscore",
            }),
        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters",
            })
            .max(16, {
                message: "Password must be less than 16 characters",
            })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number",
            })
            .regex(/[@#$%^&*()_+!]/, {
                message: "Password must contain at least one special character",
            })
            .regex(/^\S*$/, {
                message: "Password cannot contain spaces",
            })
            .refine(
                (password) =>
                    !["123456", "password", "qwerty"].includes(password),
                {
                    message: "Password is too common",
                }
            ),
        confirmPassword: z.string().min(1, {
            message: "Please confirm your password",
        }),
        email: z.string().email({
            message: "Please enter a valid email address",
        }),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: "Password does not match",
        path: ["confirmPassword"],
    });

export const loginFormSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter your username",
    }),
    password: z.string().min(1, {
        message: "Please enter your password",
    }),
});
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
