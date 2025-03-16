import { useEmployeeUpdater } from "@/controller/contexts/employee/updaters/EmployeeUpdaterContext";
import { createHook } from "@/controller/contexts/utils";
import { Mark } from "@/model";
import { createContext, useContext } from "react";
enum Fields {
    Marks = "marks",
}

export interface IEmployeeOtherUpdater {
    marks: Mark[] | null;

    updateMarks: (value: Mark[]) => void;
}

export const EmployeeOtherUpdater = createContext<IEmployeeOtherUpdater>(
    {} as IEmployeeOtherUpdater
);

export function EmployeeOtherUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { other, updateOther } = useEmployeeUpdater();

    const marks = other?.marks || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!other) {
            return;
        }
        updateOther({ ...other, [fieldName]: value as Mark[] });
    }

    function updateMarks(value: Mark[]) {
        updateField<Mark[]>(Fields.Marks, value);
    }

    const context: IEmployeeOtherUpdater = {
        marks,
        updateMarks,
    };

    return (
        <EmployeeOtherUpdater.Provider value={context}>
            {children}
        </EmployeeOtherUpdater.Provider>
    );
}

export const useEmployeeOtherUpdater = createHook(EmployeeOtherUpdater);
