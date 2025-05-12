import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/contexts/utils";
import { useApi } from "@/contexts/api";
import { EnumerationsEndPoint } from "@/contexts/enumerations/constants";
import { toSnakeCase } from "@/contexts/api/utils";

interface IEnumerationsContext {
    getEnumeration: (name: string) => { id: number; label: string }[];
    addToEnumeration: (tableName: string, label: string) => Promise<void>;
    updateEnumeration: (
        tableName: string,
        id: number,
        label: string
    ) => Promise<void>;
    removeFromEnumeration: (tableName: string, id: number) => Promise<void>;
    loading: boolean;
    error: string | null;
    reloadEnumerations: () => void;
}

const Enumerations = createContext<IEnumerationsContext | undefined>(undefined);

export const EnumerationsProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const [enumerations, setEnumerations] = useState<
        Record<string, { id: number; label: string }[]>
    >({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchEnumerations() {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(
                EnumerationsEndPoint.PREFIX
            );
            setEnumerations(response.data || {});
        } catch (err) {
            console.log(err);
            setError("Failed to fetch enumerations");
        } finally {
            setLoading(false);
        }
    }

    async function postToEnumerations(tableName: string, label: string) {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post(
                `${EnumerationsEndPoint.PREFIX}/?table_name=${tableName}`,
                { label }
            );
        } catch (err) {
            console.log(err);
            setError("Failed to post");
        } finally {
            setLoading(false);
        }
    }

    async function putToEnumerations(
        tableName: string,
        id: number,
        label: string
    ) {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.put(
                `${EnumerationsEndPoint.PREFIX}/${id}/?table_name=${tableName}`,
                { label }
            );
        } catch (err) {
            console.log(err);
            setError("Failed to put");
        } finally {
            setLoading(false);
        }
    }

    async function deleteFromEnumerations(tableName: string, id: number) {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(
                `${EnumerationsEndPoint.PREFIX}/${id}/?table_name=${tableName}`
            );
        } catch (err) {
            console.log(err);
            setError("Failed to delete");
        } finally {
            setLoading(false);
        }
    }

    const getEnumeration = (name: string) => {
        return enumerations[name] || [];
    };

    const addToEnumeration = async (tableName: string, label: string) => {
        const tableNameSnakeCase = toSnakeCase(tableName) as string;

        await postToEnumerations(tableNameSnakeCase, label);
        await fetchEnumerations();
    };

    const updateEnumeration = async (
        tableName: string,
        id: number,
        label: string
    ) => {
        const tableNameSnakeCase = toSnakeCase(tableName) as string;

        await putToEnumerations(tableNameSnakeCase, id, label);
        await fetchEnumerations();
    };

    const removeFromEnumeration = async (tableName: string, id: number) => {
        const tableNameSnakeCase = toSnakeCase(tableName) as string;

        console.log(tableNameSnakeCase);

        await deleteFromEnumerations(tableNameSnakeCase, id);
        await fetchEnumerations();
    };

    useEffect(() => {
        fetchEnumerations();
    }, []);

    const context: IEnumerationsContext = {
        addToEnumeration,
        updateEnumeration,
        removeFromEnumeration,
        getEnumeration,
        loading,
        error,
        reloadEnumerations: fetchEnumerations,
    };

    return (
        <Enumerations.Provider value={context}>
            {children}
        </Enumerations.Provider>
    );
};

export const useEnumerations = createHook(Enumerations);
