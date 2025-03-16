import { createHook } from "@/controller/contexts/utils";
import { createContext, useContext, useEffect, useState } from "react";

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

export function EditModeProvider() {
    const [editModeEnabled, setEditModeEnabled] = useState(false);

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

    return <EditMode.Provider value={context}></EditMode.Provider>;
}

export const useEditMode = createHook(EditMode);
