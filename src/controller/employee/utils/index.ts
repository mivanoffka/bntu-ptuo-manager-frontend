import { Employee, Name } from "@/model";
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
    private min: number;
    private max: number;
    private generatedNumbers: Set<number>;

    constructor() {
        this.min = -100000;
        this.max = -1;
        this.generatedNumbers = new Set<number>();
    }

    generate(): number {
        if (this.generatedNumbers.size >= Math.abs(this.min - this.max) + 1) {
            throw new Error("Все возможные числа уже сгенерированы.");
        }

        let num: number;
        do {
            num =
                Math.floor(Math.random() * (this.max - this.min + 1)) +
                this.min;
        } while (this.generatedNumbers.has(num));

        this.generatedNumbers.add(num);
        return num;
    }
}

export const tempIds = new UniqueNegativeGenerator();
