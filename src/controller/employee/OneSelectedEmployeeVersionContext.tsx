import { useApi } from "@/controller/api";
import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { useEmployeeVersions } from "@/controller/employee/EmployeeVersionsContext";
import { useOneSelectedEmployee } from "@/controller/employee/OneSelectedEmployeeContext";
import { getCopy, getNewEmployee } from "@/controller/employee/utils";
import { createHook } from "@/controller/utils";
import { IEmployee, IEmployeeVersion, IPrimaryKeyed } from "@/model";
import { DateTimeString } from "@/model/date.time.string";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { EmployeesEndPoint } from "@/controller/employee/constants";

export interface IOneSelectedEmployeeVersionContext {
    employeeVersion: IEmployeeVersion | null;
    setEmployeeVersion: (value: IEmployeeVersion | null) => void;
    isLatest: () => boolean;
}

export const OneSelectedEmployeeVersionContext =
    createContext<IOneSelectedEmployeeVersionContext>({
        employeeVersion: null,
        setEmployeeVersion: (value: IEmployeeVersion | null) => {},
        isLatest: () => false,
    });

export function OneSelectedEmployeeVersionProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { axiosInstance } = useApi();
    const { selectedVersionTimestamp, getLatestTimestamp } =
        useEmployeeVersions();

    const { oneSelectedEmployee } = useOneSelectedEmployee();

    const [employeeVersion, setEmployeeVersion] =
        useState<IEmployeeVersion | null>(null);

    useEffect(() => {
        if (oneSelectedEmployee && selectedVersionTimestamp) {
            const { id } = oneSelectedEmployee;
            fetchEmployeeVersion(id, selectedVersionTimestamp);
        }
    }, [selectedVersionTimestamp]);

    async function fetchEmployeeVersion(
        employeeId: number,
        versionTimestamp: DateTimeString
    ) {
        await axiosInstance
            .get(
                `${EmployeesEndPoint.PREFIX}/${employeeId}/${EmployeesEndPoint.VERSIONS}/${versionTimestamp}`
            )
            .then((response) => {
                const employeeVersion = response.data;
                setEmployeeVersion(employeeVersion);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function isLatest(): boolean {
        const latestVersionTimestamp = getLatestTimestamp();

        return selectedVersionTimestamp === latestVersionTimestamp;
    }

    const context: IOneSelectedEmployeeVersionContext = {
        employeeVersion,
        isLatest,
        setEmployeeVersion,
    };

    return (
        <OneSelectedEmployeeVersionContext.Provider value={context}>
            {children}
        </OneSelectedEmployeeVersionContext.Provider>
    );
}

export const useOneSelectedEmployeeVersion = createHook(
    OneSelectedEmployeeVersionContext
);
