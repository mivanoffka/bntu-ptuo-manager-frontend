import { Employee, IName } from "@/model";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { Context, useContext } from "react";

export function getNewEmployee(): Employee {
    return {
        id: null,
        names: {
            relevant: { firstName: null, lastName: null, middleName: null },
            history: [],
        },
        birthdate: null,
        birthplace: null,
        gender: null,
        bntuPositions: [],
        tradeUnionPositions: [],
        joinedAt: null,
        isArchived: false,
        archivedAt: null,
        isRetired: false,
        retiredAt: null,
        educationInstitutions: [],
        educationLevel: null,
        academicDegree: null,
        relatives: [],
        phoneNumbers: [],
        addresses: [],
        emails: [],
        rewards: [],
        comments: [],
    };
}

export function getCopy(employee: Employee): Employee {
    return {
        ...employee,
    };
}

class UniqueNegativeGenerator {
    private last: number = 0;

    generate(): number {
        return --this.last;
    }
}

export const tempIds = new UniqueNegativeGenerator();
