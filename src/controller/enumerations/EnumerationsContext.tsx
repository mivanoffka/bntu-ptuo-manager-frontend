import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";
import { EnumerationsEndPoint } from "@/controller/enumerations/constants";

export enum EnumerationName {
    GENDERS = "genders",
    PHONE_NUMBER_TYPES = "phoneNumberTypes",
    EDUCATION_LEVELS = "educationLevels",
    ACADEMIC_DEGREES = "academicDegrees",
    WORKING_GROUPS = "workingGroups",
    RELATIVE_TYPES = "relativeTypes",
}

interface IEnumerationsContext {
    getEnumeration: (name: string) => { id: number; label: string }[];
    setEnumeration: (
        name: string,
        value: { id: number; label: string }[]
    ) => void;
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

    const getEnumeration = (name: string) => {
        return enumerations[name] || [];
    };

    const setEnumeration = (
        name: string,
        value: { id: number; label: string }[]
    ) => {
        setEnumerations((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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

    useEffect(() => {
        fetchEnumerations();
    }, []);

    const context: IEnumerationsContext = {
        getEnumeration,
        setEnumeration,
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
