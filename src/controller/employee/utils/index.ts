import { Employee, Name } from "@/model";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
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
            bntuPositions: [],
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
            academicDegreeId: null,
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
export function getRandomEmployee(): Employee {
    return {
        id: parseInt(faker.string.uuid()),
        common: {
            name: new Name(
                faker.person.firstName(),
                faker.person.lastName(),
                faker.person.middleName()
            ),
            nameHistory: [],
            birthdate: dayjs(faker.date.past({ years: 30 }).toISOString()),
            birthplace: faker.location.city(),
            genderId: faker.number.int({ min: 0, max: 1 }),
        },
        bntu: {
            bntuPositions: [
                {
                    positionId: faker.number.int({ min: 1, max: 5 }),
                    department: faker.commerce.department(),
                    startDate: faker.date.past({ years: 10 }).toISOString(),
                    endDate: faker.date.recent().toISOString(),
                },
            ],
        },
        ptuo: {
            tradeUnionPositions: [
                {
                    position: faker.person.jobTitle(),
                    startDate: faker.date.past({ years: 5 }).toISOString(),
                    endDate: faker.date.recent().toISOString(),
                },
            ],
            joinedAt: faker.date.past({ years: 10 }).toISOString(),
            isArchived: faker.datatype.boolean(),
            archivedAt: faker.datatype.boolean()
                ? faker.date.recent().toISOString()
                : null,
            isRetired: faker.datatype.boolean(),
            retiredAt: faker.datatype.boolean()
                ? faker.date.recent().toISOString()
                : null,
        },
        education: {
            graduatedFrom: [faker.company.name()],
            educationLevelId: faker.number.int({ min: 1, max: 5 }), // Example: 1 = High School, 5 = PhD
            academicDegreeId: faker.number.int({ min: 1, max: 3 }), // Example: 1 = None, 3 = Doctorate
        },
        relatives: {
            relatives: [
                {
                    name: faker.person.fullName(),
                    relation: faker.word.noun(),
                    birthdate: faker.date.past({ years: 50 }).toISOString(),
                },
            ],
        },
        contacts: {
            phoneNumbers: [faker.phone.number()],
            addresses: [faker.location.streetAddress()],
            emails: [faker.internet.email()],
        },
        rewards: {
            rewards: [
                {
                    title: faker.lorem.words(3),
                    date: faker.date.past({ years: 5 }).toISOString(),
                    description: faker.lorem.sentence(),
                },
            ],
        },
        other: {
            marks: [faker.lorem.sentence()],
        },
    };
}
