import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
    isAuthorized: boolean;
    test: () => void;
    signIn: (username: string, password: string) => void;
    signOut: () => void;
}

const Auth = createContext<IAuthContext>({
    isAuthorized: false,
    test: () => {},
    signIn: () => {},
    signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    async function signIn(username: string, password: string) {
        const body = { username, password };
        await axiosInstance
            .post("/users/login/", body)
            .then(async (res) => {
                localStorage.setItem("accessToken", res?.data?.access);
                setIsAuthorized(true);
            })
            .catch((err) => console.log(err));
    }

    async function signOut() {
        localStorage.removeItem("accessToken");
        setIsAuthorized(false);
    }

    async function test() {
        await axiosInstance
            .get("/users/protected/")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        setIsAuthorized(!!localStorage.getItem("accessToken"));
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            navigate("/employees");
        } else {
            navigate("/auth/sign-in");
        }
    }, [isAuthorized]);

    const context: IAuthContext = { isAuthorized, test, signIn, signOut };

    return <Auth.Provider value={context}>{children}</Auth.Provider>;
};

export const useAuth = createHook(Auth);
