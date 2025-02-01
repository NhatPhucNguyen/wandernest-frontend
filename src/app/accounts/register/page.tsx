"use client";

import { register } from "@/api/AuthAPI";
import { Alert, AlertTitle, AlertDescription } from "@/components/Alert";
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
import { RegisterFormSchema, registerFormSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function RegisterPage() {
    const router = useRouter();
    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        },
    });
    const [error, setError] = useState({
        isError: false,
        message: "",
    });
    const onSubmit = async (values: RegisterFormSchema) => {
        const response = await register(values);
        if (response?.errorMessage) {
            return setError({ isError: true, message: response.errorMessage });
        }
        router.push("/accounts/login");
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
