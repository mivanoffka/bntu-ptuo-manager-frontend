import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { useEmployeesSelection } from "@/controller/employee/EmployeesSelectionContext";
import { getCopy, getNewEmployee } from "@/controller/employee/utils";
import { createHook } from "@/controller/utils";
import { Employee, Identifiable } from "@/model";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface IEmployeeEditor {
    displayedEmployee: Employee | null;
    createNew: () => void;
    startEdit: () => void;
    cancelEdit: () => void;
    applyEdit: () => void;
    update: (employee: Employee) => void;
    removeFromList: <T extends Identifiable>(
        fieldName: string,
        value: T
    ) => void;
    getField: <T>(fieldName: string) => T | null;
    updateList: <T extends Identifiable>(fieldName: string, value: T) => void;
    getList: <T extends Identifiable>(fieldName: string) => T[];
    updateField: <T>(fieldName: string, value: T) => void;
}

export const EmployeeEditor = createContext<IEmployeeEditor>({
    displayedEmployee: null,
    createNew: () => {},
    startEdit: () => {},
    cancelEdit: () => {},
    applyEdit: () => {},
    update: () => {},
    removeFromList: () => {},
    updateList: () => {},
    getList: () => [],
    updateField: () => {},
    getField: () => null,
});

export function EmployeeEditorProvider({ children }: { children: ReactNode }) {
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

        if (!displayedEmployee) {
            return;
        }

        enableEditMode();
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

    function getField<T>(fieldName: string): T | null {
        if (!displayedEmployee) {
            return null;
        }

        return displayedEmployee[fieldName] as T;
    }

    function updateField<T>(fieldName: string, value: T) {
        if (!displayedEmployee) {
            return;
        }

        update({ ...displayedEmployee, [fieldName]: value });
    }

    function getList<T extends Identifiable>(fieldName: string): T[] {
        if (!displayedEmployee) {
            return [];
        }

        const list = (displayedEmployee[fieldName] as T[]) || ([] as T[]);

        list.sort((a, b) => b.id - a.id);

        return list;
    }

    function updateList<T extends Identifiable>(fieldName: string, value: T) {
        if (!displayedEmployee) {
            return;
        }

        const list = (displayedEmployee[fieldName] as T[]) || ([] as T[]);

        update({
            ...displayedEmployee,
            [fieldName]: [
                ...list.filter((item) => item.id !== value.id),
                value,
            ],
        });
    }

    function removeFromList<T extends Identifiable>(
        fieldName: string,
        value: T
    ) {
        if (!displayedEmployee) {
            return;
        }

        const list = (displayedEmployee[fieldName] as T[]) || ([] as T[]);

        console.log(value);
        console.log(list);

        update({
            ...displayedEmployee,
            [fieldName]: list.filter((item) => item.id !== value.id),
        });
    }

    const context: IEmployeeEditor = {
        displayedEmployee,
        startEdit,
        applyEdit,
        cancelEdit,
        createNew,
        update,
        removeFromList,
        updateList,
        getList,
        updateField,
        getField,
    };

    return (
        <EmployeeEditor.Provider value={context}>
            {children}
        </EmployeeEditor.Provider>
    );
}

export const useEmployeeEditor = createHook(EmployeeEditor);
