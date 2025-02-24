"use client";

import { login } from "@/api/AuthAPI";
import { Alert, AlertDescription, AlertTitle } from "@/components/Alert";
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
import { loginFormSchema, LoginFormSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function LoginPage() {
    const router = useRouter();
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const [error, setError] = useState({
        isError: false,
        message: "",
    });
    const onSubmit = async (values: LoginFormSchema) => {
        const response = await login(values);
        if (response?.errorMessage) {
            setError({ isError: true, message: response.errorMessage });
        } else {
            router.push("/dashboard");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
            <Card className="w-full max-w-lg mx-4 animate-fade-down animate-once animate-duration-700 animate-ease-in-out">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center">
                                Welcome back to WanderNest
                            </CardTitle>
                            {error.isError && (
                                <Alert
                                    variant="destructive"
                                    className="animate-shake animate-duration-[400ms] animate-ease-in"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>
                                        {error.message}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="username">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} id="username" />
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
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                                id="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <div className="flex justify-center">
                            <div className="w-3/4">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CardFooter className="flex justify-center flex-col">
                            <Button
                                className="mt-5 bg-blue-600 hover:bg-blue-400"
                                size={"lg"}
                                type="submit"
                            >
                                Sign In
                            </Button>
                            <div className="mt-6 text-center text-gray-600">
                                <a>New to WanderNest ?</a>
                                <Link href={"/accounts/register"}>
                                    <Button
                                        variant={"link"}
                                        className="text-blue-500"
                                    >
                                        Sign Up
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
