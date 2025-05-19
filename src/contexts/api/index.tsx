import { createContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";
import { createHook } from "@/contexts/utils";
import { toSnakeCase } from "@/contexts/api/utils";
import qs from "qs";
import { message } from "antd"; // Импортируем message из antd
import { VITE_BACKEND_URI } from "@/config";

interface IApiContext {
    axiosInstance: AxiosInstance;
    error: string | null;
    loading: boolean;
    reloadAccessToken: () => void;
}

const Api = createContext<IApiContext | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const axiosInstance = axios.create({
        baseURL: VITE_BACKEND_URI,
        paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
    });

    async function reloadAccessToken() {
        setAccessToken(localStorage.getItem("accessToken"));
    }

    useEffect(() => {
        if (error) {
            message.error(error);
            setError(null);
        }
    }, [error]);

    axiosInstance.interceptors.request.use(
        (config) => {
            setLoading(true);
            const token = localStorage.getItem("accessToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            setLoading(false);
            setError(error.message);
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.request.use((config) => {
        if (config.method === "get" && config.params) {
            config.params = toSnakeCase(config.params);
        }
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            setLoading(false);
            return response;
        },
        (error) => {
            setLoading(false);
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Произошла ошибка";
            setError(errorMessage);
            return Promise.reject(error);
        }
    );

    const context: IApiContext = {
        axiosInstance,
        error,
        loading,
        reloadAccessToken,
    };
    return <Api.Provider value={context}>{children}</Api.Provider>;
};

export const useApi = createHook(Api);
