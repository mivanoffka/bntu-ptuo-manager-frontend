import { createHook } from "@/controller/utils";
import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useCallback,
} from "react";

export interface IEmployeesSelection {
    selectedIds: number[];
    selectOne: (id: number) => void;
    toggleSingularSelection: (id: number) => void;
    toggleMultipleSelection: (id: number) => void;
    addToSelection: (id: number) => void;
    removeFromSelection: (id: number) => void;
    selectMany: (ids: number[]) => void;
    clearSelection: () => void; // Добавлено
}

export const EmployeesSelection = createContext<IEmployeesSelection>({
    selectedIds: [],
    selectOne: () => {},
    toggleSingularSelection: () => {},
    toggleMultipleSelection: () => {},
    addToSelection: () => {},
    removeFromSelection: () => {},
    selectMany: () => {},
    clearSelection: () => {}, // Добавлено
});

export function EmployeesSelectionProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        console.log(selectedIds);
    }, [selectedIds]);

    const selectOne = useCallback((id: number) => {
        setSelectedIds([id]);
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedIds([]);
    }, []);

    const addToSelection = useCallback((id: number) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }, []);

    const removeFromSelection = useCallback((id: number) => {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
    }, []);

    const toggleMultipleSelection = useCallback((id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    }, []);

    const toggleSingularSelection = useCallback((id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) && prev.length === 1 ? [] : [id]
        );
    }, []);

    const selectMany = useCallback((ids: number[]) => {
        setSelectedIds(ids);
    }, []);

    const context: IEmployeesSelection = {
        selectedIds,
        selectMany,
        selectOne,
        addToSelection,
        removeFromSelection,
        toggleMultipleSelection,
        toggleSingularSelection,
        clearSelection, // Добавлено
    };

    return (
        <EmployeesSelection.Provider value={context}>
            {children}
        </EmployeesSelection.Provider>
    );
}

export const useEmployeesSelection = createHook(EmployeesSelection);
