import { Employee, Name } from "@/model";
import { Context, useContext } from "react";

export function getNewEmployee(): Employee {
    return {
        id: null,
        common: {
            name: new Name("", "", ""),
            nameHistory: [],
            birthdate: null,
            birthplace: "",
            genderId: null,
        },
        bntu: {
            workPositions: [],
        },
        ptuo: {
            tradeUnionPositions: [],
            joinedAt: null,
            isArchived: false,
            archivedAt: null,
            isRetired: false,
            retiredAt: null,
        },
        education: {
            graduatedFrom: [],
            educationLevelId: null,
            scientificDegreeId: null,
        },
        relatives: {
            relatives: [],
        },
        contacts: {
            phoneNumbers: [],
            addresses: [],
            emails: [],
        },
        rewards: {
            rewards: [],
        },
        other: {
            marks: [],
        },
    };
}

export function getCopy(employee: Employee): Employee {
    const { common, bntu, ptuo, relatives, contacts, rewards, other } =
        employee;

    return {
        ...employee,
        common: { ...common },
        bntu: { ...bntu },
        ptuo: { ...ptuo },
        relatives: { ...relatives },
        contacts: { ...contacts },
        rewards: { ...rewards },
        other: { ...other },
    };
}
