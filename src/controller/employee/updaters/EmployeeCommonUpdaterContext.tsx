import { createContext, useContext } from "react";
import { Dayjs } from "dayjs";
import { useEmployeeUpdater } from "@/controller/employee/updaters/EmployeeUpdaterContext";
import { Name, HistoryItem } from "@/model";
import { createHook } from "@/controller/utils";

export interface IEmployeeCommonUpdater {
    name: Name | null;
    nameHistory: HistoryItem<Name>[] | null;
    birthdate: Dayjs | null;
    birthplace: string | null;
    genderId: number | null;

    updateFirstName: (firstName: string | null) => void;
    updateLastName: (lastName: string | null) => void;
    updateMiddleName: (middleName: string | null) => void;
    updateBirthdate: (value: Dayjs | null) => void;
    updateBirthplace: (value: string | null) => void;
    updateGenderId: (value: number | null) => void;
}

export const EmployeeCommonUpdater = createContext<IEmployeeCommonUpdater>(
    {} as IEmployeeCommonUpdater
);

export function EmployeeCommonUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { common, updateCommon } = useEmployeeUpdater();

    const name = common?.name || null;
    const nameHistory = common?.nameHistory || null;
    const birthdate = common?.birthdate || null;
    const birthplace = common?.birthplace || null;
    const genderId = common?.genderId || null;

    function updateFirstName(firstName: string | null) {
        if (!common || !common.name) {
            return;
        }
        const updatedName = new Name(
            firstName,
            common.name.lastName,
            common.name.middleName
        );
        updateCommon({ ...common, name: updatedName });
    }

    function updateLastName(lastName: string | null) {
        if (!common || !common.name) {
            return;
        }
        const updatedName = new Name(
            common.name.firstName,
            lastName,
            common.name.middleName
        );
        updateCommon({ ...common, name: updatedName });
    }

    function updateMiddleName(middleName: string | null) {
        if (!common || !common.name) {
            return;
        }
        const updatedName = new Name(
            common.name.firstName,
            common.name.lastName,
            middleName
        );
        updateCommon({ ...common, name: updatedName });
    }

    function updateBirthdate(value: Dayjs | null) {
        if (!common) {
            return;
        }
        updateCommon({ ...common, birthdate: value });
    }

    function updateBirthplace(value: string | null) {
        if (!common) {
            return;
        }
        updateCommon({ ...common, birthplace: value });
    }

    function updateGenderId(value: number | null) {
        if (!common) {
            return;
        }
        updateCommon({ ...common, genderId: value });
    }

    const context: IEmployeeCommonUpdater = {
        name,
        nameHistory,
        birthdate,
        birthplace,
        genderId,
        updateFirstName,
        updateLastName,
        updateMiddleName,
        updateBirthdate,
        updateBirthplace,
        updateGenderId,
    };

    return (
        <EmployeeCommonUpdater.Provider value={context}>
            {children}
        </EmployeeCommonUpdater.Provider>
    );
}

export const useEmployeeCommonUpdater = createHook(EmployeeCommonUpdater);
