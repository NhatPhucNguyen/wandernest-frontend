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

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter your username",
    }),
    password: z.string().min(1, {
        message: "Please enter your password",
    }),
});
type FormSchema = z.infer<typeof formSchema>;
export default function LoginPage() {
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
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
                                Welcome back to WanderNest
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
                                    <Button variant={"link"} className="text-blue-500">Sign Up</Button>
                                </Link>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
