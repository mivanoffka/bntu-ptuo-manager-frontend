import { createContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";
import { createHook } from "@/controller/utils";

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
        baseURL: "http://localhost:8000",
    });

    async function reloadAccessToken() {
        setAccessToken(localStorage.getItem("accessToken"));
    }

    axiosInstance.interceptors.request.use(
        (config) => {
            setLoading(true);
            return config;
        },
        (error) => {
            setLoading(false);
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            setLoading(false);
            return response;
        },
        (error) => {
            setLoading(false);
            setError(error.message);
            return Promise.reject(error);
        }
    );

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
