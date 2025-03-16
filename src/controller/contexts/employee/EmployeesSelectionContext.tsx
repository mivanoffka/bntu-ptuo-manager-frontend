import { createHook } from "@/controller/contexts/utils";
import { createContext, useState } from "react";

export interface IEmployeesSelection {
    selectedIds: number[];
    selectOne: (id: number) => void;
    toggleSingularSelection: (id: number) => void;
    toggleMultipleSelection: (id: number) => void;
    addToSelection: (id: number) => void;
    removeFromSelection: (id: number) => void;
    selectMany: (ids: number[]) => void;
}

export const EmployeesSelection = createContext<IEmployeesSelection>({
    selectedIds: [],
    selectOne: () => {},
    toggleSingularSelection: () => {},
    toggleMultipleSelection: () => {},
    addToSelection: () => {},
    removeFromSelection: () => {},
    selectMany: () => {},
});

export function EmployeesSelectionProvider() {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    async function selectOne(id: number) {
        setSelectedIds([id]);
    }

    async function clearSelection() {
        setSelectedIds([]);
    }

    async function addToSelection(id: number) {
        setSelectedIds([...selectedIds, id]);
    }

    async function removeFromSelection(id: number) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
    }

    async function toggleMultipleSelection(id: number) {
        if (selectedIds.includes(id)) {
            removeFromSelection(id);
        } else {
            addToSelection(id);
        }
    }

    async function toggleSingularSelection(id: number) {
        if (selectedIds.includes(id)) {
            selectOne(id);
        } else {
            clearSelection();
        }
    }

    async function selectMany(ids: number[]) {
        setSelectedIds(ids);
    }

    const context: IEmployeesSelection = {
        selectedIds,
        selectMany,
        selectOne,
        addToSelection,
        removeFromSelection,
        toggleMultipleSelection,
        toggleSingularSelection,
    };

    return (
        <EmployeesSelection.Provider
            value={context}
        ></EmployeesSelection.Provider>
    );
}

export const useEmployeesSelection = createHook(EmployeesSelection);
