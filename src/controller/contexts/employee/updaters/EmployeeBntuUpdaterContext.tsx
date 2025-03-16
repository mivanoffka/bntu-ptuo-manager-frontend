import { createContext } from "react";
import { useEmployeeUpdater } from "@/controller/contexts/employee/updaters/EmployeeUpdaterContext";
import { WorkPosition } from "@/model";
import { createHook } from "@/controller/contexts/utils";

enum Fields {
    WorkPositions = "workPositions",
}

export interface IEmployeeBntuUpdater {
    workPositions: WorkPosition[] | null;

    updateWorkPositions: (value: WorkPosition[]) => void;
}

export const EmployeeBntuUpdater = createContext<IEmployeeBntuUpdater>({
    workPositions: [],
    updateWorkPositions: () => {},
});

export function EmployeeBntuUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { bntu, updateBNTU } = useEmployeeUpdater();

    const workPositions = bntu?.workPositions || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!bntu) {
            return;
        }

        updateBNTU({ ...bntu, [fieldName]: value as WorkPosition[] });
    }

    function updateWorkPositions(value: WorkPosition[]) {
        updateField<WorkPosition[]>(Fields.WorkPositions, value);
    }

    const context: IEmployeeBntuUpdater = {
        workPositions,
        updateWorkPositions,
    };

    return (
        <EmployeeBntuUpdater.Provider value={context}>
            {children}
        </EmployeeBntuUpdater.Provider>
    );
}

export const useEmployeeBntuUpdater = createHook(EmployeeBntuUpdater);
