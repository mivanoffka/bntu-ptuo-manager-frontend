import { useEditMode } from "@/controller/employee/EditModeContext";
import { useEmployees } from "@/controller/employee/EmployeesContext";
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
    displayedEmployeeVersion: IEmployeeVersion | null;
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
    updateField: <T>(fieldName: string, value: T | null) => void;
}

export const EmployeeEditorContext = createContext<IEmployeeEditorContext>({
    displayedEmployeeVersion: null,
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
    const { editModeEnabled, enableEditMode, disableEditMode } = useEditMode();

    const {
        selectedEmployeeVersion,
        selectedEmployee,
        sendNewEmployee,
        sendNewVersion,
    } = useEmployees();

    useEffect(() => {
        setDisplayedEmployeeVersion(selectedEmployeeVersion);
    }, [selectedEmployeeVersion]);

    const [displayedEmployeeVersion, setDisplayedEmployeeVersion] =
        useState<IEmployeeVersion | null>(null);

    const [employeeVersionBackUp, setEmployeeVersionBackUp] =
        useState<IEmployeeVersion | null>(null);

    function createNew() {
        enableEditMode();
        const newEmployee = getNewEmployee();
        setDisplayedEmployeeVersion(newEmployee);
    }

    function startEdit() {
        if (!displayedEmployeeVersion) {
            return;
        }

        enableEditMode();
        setEmployeeVersionBackUp(displayedEmployeeVersion);
        setDisplayedEmployeeVersion(getCopy(displayedEmployeeVersion));
    }

    function cancelEdit() {
        if (!displayedEmployeeVersion) {
            return;
        }

        setDisplayedEmployeeVersion(employeeVersionBackUp);
        setEmployeeVersionBackUp(null);
        disableEditMode();
    }

    async function applyEdit() {
        if (!displayedEmployeeVersion) {
            return;
        }

        console.log(selectedEmployee);

        if (selectedEmployee) {
            await sendNewVersion(displayedEmployeeVersion);
        } else {
            await sendNewEmployee(displayedEmployeeVersion);
        }

        setDisplayedEmployeeVersion(null);
        disableEditMode();
    }

    function getField<T>(fieldName: string): T | null {
        if (!displayedEmployeeVersion) {
            return null;
        }

        return displayedEmployeeVersion[fieldName] as T;
    }

    function updateField<T>(fieldName: string, value: T) {
        if (!displayedEmployeeVersion) {
            return;
        }

        setDisplayedEmployeeVersion({
            ...displayedEmployeeVersion,
            [fieldName]: value,
        });
    }
    function getList<T extends IPrimaryKeyed>(fieldName: string): T[] {
        if (!displayedEmployeeVersion) {
            return [];
        }

        const list =
            (displayedEmployeeVersion[fieldName] as T[]) || ([] as T[]);

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
        if (!displayedEmployeeVersion) {
            return;
        }

        const list =
            (displayedEmployeeVersion[fieldName] as T[]) || ([] as T[]);

        setDisplayedEmployeeVersion({
            ...displayedEmployeeVersion,
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
        if (!displayedEmployeeVersion) {
            return;
        }

        const list =
            (displayedEmployeeVersion[fieldName] as T[]) || ([] as T[]);

        setDisplayedEmployeeVersion({
            ...displayedEmployeeVersion,
            [fieldName]: list.filter((item) => item.id !== value.id),
        });
    }

    const context: IEmployeeEditorContext = {
        displayedEmployeeVersion,
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
