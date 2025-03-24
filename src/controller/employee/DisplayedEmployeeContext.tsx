import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { useEmployeesSelection } from "@/controller/employee/EmployeesSelectionContext";
import { getCopy, getNewEmployee } from "@/controller/employee/utils";
import { createHook } from "@/controller/utils";
import { Employee } from "@/model";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface IDisplayedEmployee {
    displayedEmployee: Employee | null;
    createNew: () => void;
    startEdit: () => void;
    cancelEdit: () => void;
    applyEdit: () => void;
    update: (employee: Employee) => void;
}

export const DisplayedEmployee = createContext<IDisplayedEmployee>({
    displayedEmployee: null,
    createNew: () => {},
    startEdit: () => {},
    cancelEdit: () => {},
    applyEdit: () => {},
    update: () => {},
});

export function DisplayedEmployeeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { selectedIds } = useEmployeesSelection();
    const { list, push } = useEmployees();
    const { editModeEnabled, enableEditMode, disableEditMode } = useEditMode();

    const [displayedEmployee, setDisplayedEmployee] = useState<Employee | null>(
        null
    );

    const [displayedEmployeeBackUp, setDisplayedEmployeeBackUp] =
        useState<Employee | null>(null);

    useEffect(() => {
        if (editModeEnabled) {
            return;
        }

        if (selectedIds) {
            const lastAddedId = selectedIds[selectedIds.length - 1];
            const employee = list[lastAddedId];
            setDisplayedEmployee(employee);
        } else {
            setDisplayedEmployee(null);
        }
    }, [selectedIds]);

    function createNew() {
        const newEmployee = getNewEmployee();
        setDisplayedEmployee(newEmployee);

        startEdit();
    }

    function startEdit() {
        if (!displayedEmployee) {
            return;
        }

        enableEditMode();
        setDisplayedEmployeeBackUp(displayedEmployee);
        setDisplayedEmployee(getCopy(displayedEmployee));
    }

    function cancelEdit() {
        if (!displayedEmployee) {
            return;
        }

        setDisplayedEmployee(displayedEmployeeBackUp);
        setDisplayedEmployeeBackUp(null);
        disableEditMode();
    }

    async function applyEdit() {
        if (!displayedEmployee) {
            return;
        }

        await push(displayedEmployee);
        disableEditMode();
    }

    function update(employee: Employee) {
        if (!editModeEnabled) {
            return;
        }

        setDisplayedEmployee(employee);
    }

    const context: IDisplayedEmployee = {
        displayedEmployee,
        startEdit,
        applyEdit,
        cancelEdit,
        createNew,
        update,
    };

    return (
        <DisplayedEmployee.Provider value={context}>
            {children}
        </DisplayedEmployee.Provider>
    );
}

export const useDisplayedEmployee = createHook(DisplayedEmployee);
