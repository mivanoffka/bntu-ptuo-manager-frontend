import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { getCopy, getNewEmployee } from "@/controller/employee/utils";
import { createHook } from "@/controller/utils";
import { IEmployee, IPrimaryKeyed } from "@/model";
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
    const { list } = useEmployees();
    const { editModeEnabled } = useEditMode();

    const [oneSelectedEmployee, setOneSelectedEmployee] =
        useState<IEmployee | null>(null);

    useEffect(() => {
        if (editModeEnabled) {
            return;
        }

        if (selectedIds) {
            const lastAddedId = selectedIds[selectedIds.length - 1];

            const employee = list.find((item) => item.id === lastAddedId);

            if (employee) {
                setOneSelectedEmployee(employee);
            }
        } else {
            setOneSelectedEmployee(null);
        }
    }, [selectedIds]);

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
