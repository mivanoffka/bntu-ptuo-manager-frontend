import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/contexts/utils";
import { useApi } from "@/contexts/api";
import { useNavigate } from "react-router-dom";
import { IUser } from "@/model";

interface IAuthContext {
    signIn: (username: string, password: string) => Promise<void>;
    signUp: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    user: IUser | null;
}

const Auth = createContext<IAuthContext>({
    signIn: async () => {},
    signUp: async () => {},
    signOut: () => {},
    user: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);

    async function signIn(username: string, password: string) {
        await signOut();

        const body = { username, password };
        await axiosInstance
            .post("/auth/sign-in/", body)
            .then(async (res) => {
                const {
                    tokens: { access },
                    user,
                } = res.data;

                localStorage.setItem("accessToken", access);
                localStorage.setItem("user", JSON.stringify(user));

                setUser(user);
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

    async function getUser() {
        await axiosInstance
            .get("/users/user")
            .then((res) => {
                const { data } = res;
                setUser(data);
            })
            .catch((err) => console.log(err));
    }

    async function signOut() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
    }

    async function restoreUser() {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;

        setUser(user);

        if (user) {
            await getUser();
        }
    }

    useEffect(() => {
        restoreUser();
    }, []);

    useEffect(() => {
        if (user) {
            navigate("/employees");
        } else {
            navigate("/auth");
        }
    }, [user]);

    const context: IAuthContext = {
        signIn,
        signUp,
        signOut,
        user,
    };

    return <Auth.Provider value={context}>{children}</Auth.Provider>;
};

export const useAuth = createHook(Auth);
