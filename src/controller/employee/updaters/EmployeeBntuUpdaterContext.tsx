import { createContext } from "react";
import { useEmployeeUpdater } from "@/controller/employee/updaters/EmployeeUpdaterContext";
import { BntuPosition } from "@/model";
import { createHook } from "@/controller/utils";

enum Fields {
    BntuPositions = "bntuPositions",
}

export interface IEmployeeBntuUpdater {
    bntuPositions: BntuPosition[] | null;

    updateBntuPositions: (value: BntuPosition[]) => void;
}

export const EmployeeBntuUpdater = createContext<IEmployeeBntuUpdater>({
    bntuPositions: [],
    updateBntuPositions: () => {},
});

export function EmployeeBntuUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { bntu, updateBNTU } = useEmployeeUpdater();

    const bntuPositions = bntu?.bntuPositions || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!bntu) {
            return;
        }

        updateBNTU({ ...bntu, [fieldName]: value as BntuPosition[] });
    }

    function updateBntuPositions(value: BntuPosition[]) {
        updateField<BntuPosition[]>(Fields.BntuPositions, value);
    }

    const context: IEmployeeBntuUpdater = {
        bntuPositions,
        updateBntuPositions,
    };

    return (
        <EmployeeBntuUpdater.Provider value={context}>
            {children}
        </EmployeeBntuUpdater.Provider>
    );
}

export const useEmployeeBntuUpdater = createHook(EmployeeBntuUpdater);
