import { useApi } from "@/controller/api";
import { EmployeesEndPoint } from "@/controller/employee/constants";
import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { getCopy, getNewEmployee } from "@/controller/employee/utils";
import { createHook } from "@/controller/utils";
import { IEmployee, IEmployeeVersion, IPrimaryKeyed } from "@/model";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface IOneSelectedEmployeeContext {
    oneSelectedEmployee: IEmployee | null;
}

export const OneSelectedEmployeeContext =
    createContext<IOneSelectedEmployeeContext>({
        oneSelectedEmployee: null,
    });

export function OneSelectedEmployeeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { selectedIds } = useSelectedEmployees();
    const { editModeEnabled } = useEditMode();
    const { axiosInstance } = useApi();

    const { allInvalid } = useEmployees();

    const [oneSelectedEmployee, setOneSelectedEmployee] =
        useState<IEmployee | null>(null);

    async function fetchOneEmployee(id: number) {
        const data = await axiosInstance
            .get(`${EmployeesEndPoint.PREFIX}/${id}/`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return undefined;
            });

        return data;
    }

    async function fetchSelectedEmployee(id: number) {
        const employee = await fetchOneEmployee(id);

        setOneSelectedEmployee(employee);
    }

    useEffect(() => {
        if (editModeEnabled) {
            return;
        }
        if (selectedIds && selectedIds.length > 0) {
            const lastAddedId = selectedIds[selectedIds.length - 1];

            fetchSelectedEmployee(lastAddedId);
        } else {
            setOneSelectedEmployee(null);
        }
    }, [selectedIds, allInvalid]);

    useEffect(() => {
        if (allInvalid) {
            if (editModeEnabled) {
                return;
            }
            if (selectedIds && selectedIds.length > 0) {
                const lastAddedId = selectedIds[selectedIds.length - 1];

                fetchSelectedEmployee(lastAddedId);
            } else {
                setOneSelectedEmployee(null);
            }
        }
    }, [allInvalid]);

    const context: IOneSelectedEmployeeContext = {
        oneSelectedEmployee,
    };

    return (
        <OneSelectedEmployeeContext.Provider value={context}>
            {children}
        </OneSelectedEmployeeContext.Provider>
    );
}

export const useOneSelectedEmployee = createHook(OneSelectedEmployeeContext);
