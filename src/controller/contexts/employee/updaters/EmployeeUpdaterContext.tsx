import { createContext, useContext } from "react";
import { DisplayedEmployee } from "../DisplayedEmployeeContext";
import { createHook } from "@/controller/contexts/utils";
import {
    EmployeeBNTU,
    EmployeeCommon,
    EmployeeContacts,
    EmployeeEducation,
    EmployeeOther,
    EmployeePTUO,
    EmployeeRelatives,
    EmployeeRewards,
} from "@/model";

enum Fields {
    Common = "common",
    BNTU = "bntu",
    PTUO = "ptuo",
    Education = "education",
    Contacts = "contacts",
    Relatives = "relatives",
    Rewards = "rewards",
    Other = "other",
}

export interface IEmployeeUpdater {
    common: EmployeeCommon | null;
    bntu: EmployeeBNTU | null;
    contacts: EmployeeContacts | null;
    relatives: EmployeeRelatives | null;
    rewards: EmployeeRewards | null;
    other: EmployeeOther | null;
    education: EmployeeEducation | null;
    ptuo: EmployeePTUO | null;

    updateCommon: (value: EmployeeCommon) => void;
    updateBNTU: (value: EmployeeBNTU) => void;
    updatePTUO: (value: EmployeePTUO) => void;
    updateEducation: (value: EmployeeEducation) => void;
    updateContacts: (value: EmployeeContacts) => void;
    updateRelatives: (value: EmployeeRelatives) => void;
    updateRewards: (value: EmployeeRewards) => void;
    updateOther: (value: EmployeeOther) => void;
}

export const EmployeeUpdater = createContext<IEmployeeUpdater>(
    {} as IEmployeeUpdater
);

export function EmployeeUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { displayedEmployee, update } = useContext(DisplayedEmployee);

    const common = displayedEmployee?.common || null;
    const bntu = displayedEmployee?.bntu || null;
    const contacts = displayedEmployee?.contacts || null;
    const relatives = displayedEmployee?.relatives || null;
    const rewards = displayedEmployee?.rewards || null;
    const other = displayedEmployee?.other || null;
    const education = displayedEmployee?.education || null;
    const ptuo = displayedEmployee?.ptuo || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!displayedEmployee) {
            return;
        }

        update({ ...displayedEmployee, [fieldName]: value });
    }

    function updateCommon(value: EmployeeCommon) {
        updateField<EmployeeCommon>(Fields.Common, value);
    }

    function updateBNTU(value: EmployeeBNTU) {
        updateField<EmployeeBNTU>(Fields.BNTU, value);
    }

    function updatePTUO(value: EmployeePTUO) {
        updateField<EmployeePTUO>(Fields.PTUO, value);
    }

    function updateEducation(value: EmployeeEducation) {
        updateField<EmployeeEducation>(Fields.Education, value);
    }

    function updateContacts(value: EmployeeContacts) {
        updateField<EmployeeContacts>(Fields.Contacts, value);
    }

    function updateRelatives(value: EmployeeRelatives) {
        updateField<EmployeeRelatives>(Fields.Relatives, value);
    }

    function updateRewards(value: EmployeeRewards) {
        updateField<EmployeeRewards>(Fields.Rewards, value);
    }

    function updateOther(value: EmployeeOther) {
        updateField<EmployeeOther>(Fields.Other, value);
    }

    const context: IEmployeeUpdater = {
        common,
        bntu,
        ptuo,
        contacts,
        relatives,
        education,
        other,
        rewards,
        updateCommon,
        updateBNTU,
        updatePTUO,
        updateEducation,
        updateContacts,
        updateRelatives,
        updateRewards,
        updateOther,
    };

    return (
        <EmployeeUpdater.Provider value={context}>
            {children}
        </EmployeeUpdater.Provider>
    );
}

export const useEmployeeUpdater = createHook(EmployeeUpdater);
