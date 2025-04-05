import { createHook } from "@/controller/utils";
import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useCallback,
} from "react";

export interface ISelectedEmployees {
    selectedIds: number[];
    selectOne: (id: number) => void;
    toggleSingularSelection: (id: number) => void;
    toggleMultipleSelection: (id: number) => void;
    addToSelection: (id: number) => void;
    removeFromSelection: (id: number) => void;
    selectMany: (ids: number[]) => void;
    clearSelection: () => void; // Добавлено
}

export const SelectedEmployeesContext = createContext<ISelectedEmployees>({
    selectedIds: [],
    selectOne: () => {},
    toggleSingularSelection: () => {},
    toggleMultipleSelection: () => {},
    addToSelection: () => {},
    removeFromSelection: () => {},
    selectMany: () => {},
    clearSelection: () => {}, // Добавлено
});

export function SelectedEmployeesProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

    const context: ISelectedEmployees = {
        selectedIds,
        selectMany,
        selectOne,
        addToSelection,
        removeFromSelection,
        toggleMultipleSelection,
        toggleSingularSelection,
        clearSelection,
    };

    return (
        <SelectedEmployeesContext.Provider value={context}>
            {children}
        </SelectedEmployeesContext.Provider>
    );
}

export const useSelectedEmployees = createHook(SelectedEmployeesContext);
