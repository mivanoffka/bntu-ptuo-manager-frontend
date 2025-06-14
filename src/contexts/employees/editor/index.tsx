import { useApi } from "@/contexts/api";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployees } from "@/contexts/employees";
import { getCopy, getNewEmployee } from "@/contexts/employees/utils";
import { createHook } from "@/contexts/utils";
import { IEmployeeVersion, IPrimaryKeyed } from "@/model";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { FormInstance } from "antd";
import { API_URI } from "@/config";

export interface IEmployeeEditorContext {
    displayedEmployeeVersion: IEmployeeVersion | null;
    createNew: () => void;
    startEdit: () => void;
    cancelEdit: () => void;
    applyEdit: (form: FormInstance) => void;
    removeFromList: <T extends IPrimaryKeyed>(
        fieldName: string,
        value: T
    ) => void;
    getField: <T>(fieldName: string) => T | null;
    updateList: <T extends IPrimaryKeyed>(fieldName: string, value: T) => void;
    getList: <T extends IPrimaryKeyed>(fieldName: string) => T[];
    updateField: <T>(fieldName: string, value: T | null) => void;

    getNewImage: () => File | null | undefined;
    setNewImage: (value: File | null | undefined) => void;

    isValid: boolean;
    setIsValid: (value: boolean) => void;
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

    getNewImage: () => null,
    setNewImage: () => {},

    isValid: false,
    setIsValid: () => {},
});

export function EmployeeEditorProvider({ children }: { children: ReactNode }) {
    const { axiosInstance } = useApi();
    const [newImage, setNewImage] = useState<File | null | undefined>(null);

    const { editModeEnabled, enableEditMode, disableEditMode } = useEditMode();

    const [isValid, setIsValid] = useState(true);

    const {
        selectedEmployeeVersion,
        selectedEmployee,
        sendNewEmployee,
        sendNewVersion,
    } = useEmployees();

    useEffect(() => {
        setDisplayedEmployeeVersion(selectedEmployeeVersion);
        setNewImage(undefined);
    }, [selectedEmployeeVersion]);

    const [displayedEmployeeVersion, setDisplayedEmployeeVersion] =
        useState<IEmployeeVersion | null>(null);

    const [employeeVersionBackUp, setEmployeeVersionBackUp] =
        useState<IEmployeeVersion | null>(null);

    function createNew() {
        enableEditMode();
        const newEmployee = getNewEmployee();
        setDisplayedEmployeeVersion(newEmployee);
        setNewImage(undefined);
    }

    function startEdit() {
        if (!displayedEmployeeVersion) {
            return;
        }

        enableEditMode();
        setEmployeeVersionBackUp(displayedEmployeeVersion);
        setDisplayedEmployeeVersion(getCopy(displayedEmployeeVersion));
        setNewImage(undefined);
    }

    function cancelEdit() {
        if (!displayedEmployeeVersion) {
            return;
        }

        setDisplayedEmployeeVersion(employeeVersionBackUp);
        setEmployeeVersionBackUp(null);
        disableEditMode();
        setNewImage(undefined);
    }

    async function applyEdit(form: FormInstance) {
        form.validateFields();
        const formJson = form.getFieldsValue();

        if (!displayedEmployeeVersion) {
            return;
        }

        let { imagePath } = displayedEmployeeVersion;

        if (newImage) {
            imagePath = await uploadImage(newImage);
        } else {
            if (newImage === null) {
                imagePath = null;
            }
        }

        const newEmployeeVersion = {
            ...formJson,
            imagePath,
        };

        const result = selectedEmployee
            ? await sendNewVersion(newEmployeeVersion)
            : await sendNewEmployee(newEmployeeVersion);

        if (result) {
            disableEditMode();
        }
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

    function stripHostAndProtocol(url: string) {
        const parsedUrl = new URL(url);

        return parsedUrl.pathname.startsWith("/")
            ? parsedUrl.pathname.slice(1)
            : parsedUrl.pathname;
    }

    async function uploadImage(file: File) {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axiosInstance.post(
                "media-upload/images/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const { file: pathBase } = response.data;

            const path = stripHostAndProtocol(pathBase);

            console.log(path);

            return path;
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
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
        getNewImage: () => newImage,
        setNewImage: (value) => setNewImage(value),
        isValid,
        setIsValid: (value) => setIsValid(value),
    };

    return (
        <EmployeeEditorContext.Provider value={context}>
            {children}
        </EmployeeEditorContext.Provider>
    );
}

export const useEmployeeEditor = createHook(EmployeeEditorContext);
