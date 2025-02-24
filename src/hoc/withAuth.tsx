"use client";
import { validateToken } from "@/api/AuthAPI";
import Cookie from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export type AuthProps = {
    token?: string;
    children: React.ReactNode;
};
const withAuth = <P extends AuthProps>(WrappedComponent: NextPage<P>) => {
    const Wrapper: NextPage<P> = (props) => {
        const router = useRouter();
        const [isValidating, setIsValidating] = useState(true);
        useEffect(() => {
            const validate = async () => {
                const isValid = await validateToken();
                if (!isValid) {
                    return router.push("/accounts/login");
                } else {
                    setIsValidating(false);
                }
            };
            if (!Cookie.get("username")) {
                validate();
            }
            else{
              setIsValidating(false);
            }
        }, [router]);
        if (isValidating) return null;
        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
