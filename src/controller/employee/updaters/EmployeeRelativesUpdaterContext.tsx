import { createContext } from "react";
import { useEmployeeUpdater } from "@/controller/employee/updaters/EmployeeUpdaterContext";
import { createHook } from "@/controller/utils";
import { Relative } from "@/model";

enum Fields {
    Relatives = "relatives",
}

export interface EmployeeRelativesUpdater {
    relatives: Relative[] | null;

    updateRelatives: (value: Relative[]) => void;
}

export const EmployeeRelativesUpdater = createContext<EmployeeRelativesUpdater>(
    {} as EmployeeRelativesUpdater
);

export function EmployeeRelativesUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { relatives, updateRelatives } = useEmployeeUpdater();

    const relativesField = relatives?.relatives || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!relatives) {
            return;
        }
        updateRelatives({ ...relatives, [fieldName]: value as Relative[] });
    }

    function updateLocalRelatives(value: Relative[]) {
        updateField<Relative[]>(Fields.Relatives, value);
    }

    const context: EmployeeRelativesUpdater = {
        relatives: relativesField,
        updateRelatives: updateLocalRelatives,
    };

    return (
        <EmployeeRelativesUpdater.Provider value={context}>
            {children}
        </EmployeeRelativesUpdater.Provider>
    );
}

export const useEmployeeRelativesUpdater = createHook(EmployeeRelativesUpdater);
