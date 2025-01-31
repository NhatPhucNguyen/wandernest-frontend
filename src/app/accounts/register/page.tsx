"use client";

import { Button } from "@/components/Button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/Form";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
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
type FormSchema = z.infer<typeof formSchema>;
export default function RegisterPage() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        },
    });
    const onSubmit = (values: FormSchema) => {
        console.log(values);
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
            <Card className="w-full max-w-lg mx-4 animate-fade-down animate-once animate-duration-700 animate-ease-in-out">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center">
                                Create your WanderNest account
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-center flex-col">
                            <Button
                                className="mt-5 bg-blue-600 hover:bg-blue-400"
                                size={"lg"}
                                type="submit"
                            >
                                Sign Up
                            </Button>
                            <div className="mt-6 text-center text-gray-600">
                                <a>Already have an account ?</a>
                                <Link href={"/accounts/login"}>
                                    <Button
                                        variant={"link"}
                                        className="text-blue-500"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
