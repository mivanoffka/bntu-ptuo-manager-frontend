import { DateTimeString, IEmployeeVersion } from "@/model";
import dayjs from "dayjs";

export function getNewEmployee(): IEmployeeVersion {
    return {
        id: tempIds.generate(),
        firstName: null,
        middleName: null,
        lastName: null,
        imagePath: null,

        birthdate: null,
        birthplace: null,
        genderId: null,

        bntuPositions: [],

        tradeUnionMembershipNumber: null,
        tradeUnionPositions: [],
        tradeUnionDepartmentAuthenticLabel: null,
        tradeUnionDepartmentPath: null,
        workingGroupAuthenticLabel: null,
        workingGroupId: null,

        joinedAt: null,
        recordedAt: null,
        isArchived: false,
        archivedAt: null,
        isRetired: false,
        retiredAt: null,

        phoneNumbers: [],
        emails: [],
        addresses: [],

        educationalInstitutions: [],
        academicDegreeId: null,
        educationLevelId: null,

        relatives: [],
        rewards: [],
        comments: [],
        exemptionIds: [],

        createdAt: null,
        updatedAt: null,
    };
}

export function getCopy(employeeVersion: IEmployeeVersion) {
    return { ...employeeVersion };
}

export function getLatestTimestamp(
    from: DateTimeString[]
): DateTimeString | null {
    return from.reduce((latest: DateTimeString, current: DateTimeString) => {
        const currentDate = dayjs(current);
        const latestDate = dayjs(latest);

        return currentDate.isAfter(latestDate) ? current : latest;
    });
}

class UniqueNegativeGenerator {
    private last: number = 0;

    generate(): number {
        return --this.last;
    }
}

export const tempIds = new UniqueNegativeGenerator();
