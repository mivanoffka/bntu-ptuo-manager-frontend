import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployees } from "@/controller/employee/EmployeesContext";
import { useOneSelectedEmployeeVersion } from "@/controller/employee/OneSelectedEmployeeVersionContext";
import { useSelectedEmployees } from "@/controller/employee/SelectedEmployeesContext";
import { getCopy, getNewEmployee } from "@/controller/employee/utils";
import { createHook } from "@/controller/utils";
import { IEmployeeVersion, IPrimaryKeyed } from "@/model";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface IEmployeeEditorContext {
    employeeVersion: IEmployeeVersion | null;
    createNew: () => void;
    startEdit: () => void;
    cancelEdit: () => void;
    applyEdit: () => void;
    removeFromList: <T extends IPrimaryKeyed>(
        fieldName: string,
        value: T
    ) => void;
    getField: <T>(fieldName: string) => T | null;
    updateList: <T extends IPrimaryKeyed>(fieldName: string, value: T) => void;
    getList: <T extends IPrimaryKeyed>(fieldName: string) => T[];
    updateField: <T>(fieldName: string, value: T) => void;
}

export const EmployeeEditorContext = createContext<IEmployeeEditorContext>({
    employeeVersion: null,
    createNew: () => {},
    startEdit: () => {},
    cancelEdit: () => {},
    applyEdit: () => {},
    removeFromList: () => {},
    updateList: () => {},
    getList: () => [],
    updateField: () => {},
    getField: () => null,
});

export function EmployeeEditorProvider({ children }: { children: ReactNode }) {
    const { selectedIds } = useSelectedEmployees();
    const { list, push } = useEmployees();
    const { editModeEnabled, enableEditMode, disableEditMode } = useEditMode();

    const { employeeVersion, setEmployeeVersion } =
        useOneSelectedEmployeeVersion();

    const [employeeVersionBackUp, setEmployeeVersionBackUp] =
        useState<IEmployeeVersion | null>(null);

    function createNew() {
        const newEmployee = getNewEmployee();
        setEmployeeVersion(newEmployee);

        if (!employeeVersion) {
            return;
        }

        enableEditMode();
    }

    function startEdit() {
        if (!employeeVersion) {
            return;
        }

        enableEditMode();
        setEmployeeVersionBackUp(employeeVersion);
        setEmployeeVersion(getCopy(employeeVersion));
    }

    function cancelEdit() {
        if (!employeeVersion) {
            return;
        }

        setEmployeeVersion(employeeVersionBackUp);
        setEmployeeVersionBackUp(null);
        disableEditMode();
    }

    async function applyEdit() {
        if (!employeeVersion) {
            return;
        }

        await push(employeeVersion);
        disableEditMode();
    }

    function getField<T>(fieldName: string): T | null {
        if (!employeeVersion) {
            return null;
        }

        return employeeVersion[fieldName] as T;
    }

    function updateField<T>(fieldName: string, value: T) {
        if (!employeeVersion) {
            return;
        }

        setEmployeeVersion({ ...employeeVersion, [fieldName]: value });
    }
    function getList<T extends IPrimaryKeyed>(fieldName: string): T[] {
        if (!employeeVersion) {
            return [];
        }

        const list = (employeeVersion[fieldName] as T[]) || ([] as T[]);

        list.sort((a, b) => {
            if (a.id > 0 && b.id > 0) {
                return a.id - b.id;
            }
            if (a.id < 0 && b.id < 0) {
                return b.id - a.id;
            }
            return a.id > 0 ? -1 : 1;
        });

        return list;
    }

    function updateList<T extends IPrimaryKeyed>(fieldName: string, value: T) {
        if (!employeeVersion) {
            return;
        }

        const list = (employeeVersion[fieldName] as T[]) || ([] as T[]);

        setEmployeeVersion({
            ...employeeVersion,
            [fieldName]: [
                ...list.filter((item) => item.id !== value.id),
                value,
            ],
        });
    }

    function removeFromList<T extends IPrimaryKeyed>(
        fieldName: string,
        value: T
    ) {
        if (!employeeVersion) {
            return;
        }

        const list = (employeeVersion[fieldName] as T[]) || ([] as T[]);

        setEmployeeVersion({
            ...employeeVersion,
            [fieldName]: list.filter((item) => item.id !== value.id),
        });
    }

    const context: IEmployeeEditorContext = {
        employeeVersion,
        startEdit,
        applyEdit,
        cancelEdit,
        createNew,
        removeFromList,
        updateList,
        getList,
        updateField,
        getField,
    };

    return (
        <EmployeeEditorContext.Provider value={context}>
            {children}
        </EmployeeEditorContext.Provider>
    );
}

export const useEmployeeEditor = createHook(EmployeeEditorContext);
