import { createHook } from "@/contexts/utils";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export interface IEditMode {
    editModeEnabled: boolean;
    enableEditMode: () => void;
    disableEditMode: () => void;
    toggleEditMode: () => void;
}

export const EditMode = createContext<IEditMode>({
    editModeEnabled: false,
    enableEditMode: () => {},
    disableEditMode: () => {},
    toggleEditMode: () => {},
});

export function EditModeProvider({ children }: { children: ReactNode }) {
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    useEffect(() => {}, [editModeEnabled]);

    function enableEditMode() {
        setEditModeEnabled(true);
    }

    function disableEditMode() {
        setEditModeEnabled(false);
    }

    function toggleEditMode() {
        setEditModeEnabled(!editModeEnabled);
    }

    const context: IEditMode = {
        editModeEnabled,
        enableEditMode,
        disableEditMode,
        toggleEditMode,
    };

    return <EditMode.Provider value={context}>{children}</EditMode.Provider>;
}

export const useEditMode = createHook(EditMode);
