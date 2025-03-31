import { createContext, useState, useEffect, ReactNode } from "react";
import { createHook } from "@/controller/utils";
import { useApi } from "@/controller/api";

interface IEnumerationsContext {
    genders: { id: number; label: string }[];
    phoneNumberTypes: { id: number; label: string }[];
    educationLevels: { id: number; label: string }[];
    academicDegrees: { id: number; label: string }[];
    workingGroups: { id: number; label: string }[];
    relativeTypes: { id: number; label: string }[];
    loading: boolean;
    error: string | null;
    reloadEnumerations: () => void;
}

const Enumerations = createContext<IEnumerationsContext | undefined>(undefined);

export const EnumerationsProvider = ({ children }: { children: ReactNode }) => {
    const { axiosInstance } = useApi();
    const [genders, setGenders] = useState([]);
    const [phoneNumberTypes, setPhoneNumberTypes] = useState([]);
    const [educationLevels, setEducationLevel] = useState([]);
    const [academicDegrees, setAcademicDegrees] = useState([]);
    const [workingGroups, setWorkingGroups] = useState([]);
    const [relativeTypes, setRelativeTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchEnumerations() {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get("/employees/enumerations");
            setGenders(response.data.genders || []);
            setPhoneNumberTypes(response.data.phoneNumberTypes || []);
            setEducationLevel(response.data.educationLevels || []);
            setAcademicDegrees(response.data.academicDegrees || []);
            setWorkingGroups(response.data.workingGroups || []);
            setRelativeTypes(response.data.relativeTypes || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEnumerations();
    }, []);

    const context: IEnumerationsContext = {
        genders,
        phoneNumberTypes,
        educationLevels,
        academicDegrees,
        workingGroups,
        relativeTypes,
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
