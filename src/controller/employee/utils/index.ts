import { IEmployeeVersion } from "@/model";

export function getNewEmployee(): IEmployeeVersion {
    return {
        id: tempIds.generate(),
        names: [],
        newName: null,

        birthdate: null,
        birthplace: null,
        genderId: null,

        bntuPositions: [],

        tradeUnionPositions: [],
        tradeUnionDepartmentRecords: [],
        newTradeUnionDepartmentRecord: null,
        workingGroupRecords: [],
        newWorkingGroupRecord: null,

        joinedAt: null,
        recordedAt: null,
        isArchived: false,
        archivedAt: null,
        isRetired: false,
        retiredAt: null,

        phoneNumbers: [],
        emails: [],
        addresses: [],

        educationInstitutions: [],
        academicDegreeId: null,
        educationLevelId: null,

        relatives: [],
        rewards: [],
        comments: [],

        createdAt: null,
        updatedAt: null,
    };
}

class UniqueNegativeGenerator {
    private last: number = 0;

    generate(): number {
        return --this.last;
    }
}

export const tempIds = new UniqueNegativeGenerator();
