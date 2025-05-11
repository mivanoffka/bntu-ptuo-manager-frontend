import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
    isAuthorized: boolean;
    signIn: (username: string, password: string) => Promise<void>;
    signUp: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    username: string | null;
}

const Auth = createContext<IAuthContext>({
    isAuthorized: false,
    signIn: async () => {},
    signUp: async () => {},
    signOut: () => {},
    username: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);

    async function signIn(username: string, password: string) {
        const body = { username, password };
        await axiosInstance
            .post("/auth/sign-in/", body)
            .then(async (res) => {
                const {
                    tokens: { access },
                    user: { username },
                } = res.data;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("username", username);

                setIsAuthorized(true);
                setUsername(username);
            })
            .catch((err) => console.log(err));
    }

    async function signUp(username: string, password: string) {
        const body = { username, password };
        await axiosInstance
            .post("/auth/sign-up/", body)
            .then(async (res) => {})
            .catch((err) => console.log(err));
    }

    async function signOut() {
        localStorage.removeItem("accessToken");
        setIsAuthorized(false);
    }

    useEffect(() => {
        setIsAuthorized(!!localStorage.getItem("accessToken"));
        setUsername(localStorage.getItem("username"));
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            navigate("/employees");
        } else {
            navigate("/auth");
        }
    }, [isAuthorized]);

    const context: IAuthContext = {
        isAuthorized,
        signIn,
        signUp,
        signOut,
        username,
    };

    return <Auth.Provider value={context}>{children}</Auth.Provider>;
};

export const useAuth = createHook(Auth);
