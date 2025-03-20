import { useEmployeeUpdater } from "@/controller/employee/updaters/EmployeeUpdaterContext";
import { createHook } from "@/controller/utils";
import { createContext } from "react";

enum Fields {
    GraduatedFrom = "graduatedFrom",
    EducationLevelId = "educationLevelId",
    ScientificDegreeId = "academicDegreeId",
}

export interface IEmployeeEducationUpdater {
    graduatedFrom: string[] | null;
    educationLevelId: number | null;
    academicDegreeId: number | null;

    updateGraduatedFrom: (value: string[]) => void;
    updateEducationLevelId: (value: number | null) => void;
    updateScientificDegreeId: (value: number | null) => void;
}

export const EmployeeEducationUpdater =
    createContext<IEmployeeEducationUpdater>({} as IEmployeeEducationUpdater);

export function EmployeeEducationUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { education, updateEducation } = useEmployeeUpdater();

    const graduatedFrom = education?.graduatedFrom || null;
    const educationLevelId = education?.educationLevelId || null;
    const academicDegreeId = education?.academicDegreeId || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!education) {
            return;
        }
        updateEducation({ ...education, [fieldName]: value });
    }

    function updateGraduatedFrom(value: string[]) {
        updateField<string[]>(Fields.GraduatedFrom, value);
    }

    function updateEducationLevelId(value: number | null) {
        updateField<number | null>(Fields.EducationLevelId, value);
    }

    function updateScientificDegreeId(value: number | null) {
        updateField<number | null>(Fields.ScientificDegreeId, value);
    }

    const context: IEmployeeEducationUpdater = {
        graduatedFrom,
        educationLevelId,
        academicDegreeId,
        updateGraduatedFrom,
        updateEducationLevelId,
        updateScientificDegreeId,
    };

    return (
        <EmployeeEducationUpdater.Provider value={context}>
            {children}
        </EmployeeEducationUpdater.Provider>
    );
}

export const useEmployeeEducationUpdater = createHook(EmployeeEducationUpdater);
