import { DateTimeString } from "@/model/basics";

export const enum EmployeesSearchField {
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    MIDDLE_NAME = "middle_name",
    BIRTHPLACE = "birthplace",
}

export interface IEmployeesFilter {
    search: string | null;
    searchFields: EmployeesSearchField[];
    genderIds: number[];
    workingGroupIds: number[];
    educationLevelIds: number[];
    academicDegreeIds: number[];
    birthdateMin: DateTimeString | null;
    birthdateMax: DateTimeString | null;
    isArchived: boolean | null;
    isRetired: boolean | null;
    tradeUnionDepartmentPaths: string[];
    bntuDepartmentPaths: string[];
    bntuPositionLabels: string[];
    exemptionIds: number[];
}

export const DEFAULT_FILTER: IEmployeesFilter = {
    search: null,
    searchFields: [
        EmployeesSearchField.LAST_NAME,
        EmployeesSearchField.FIRST_NAME,
        EmployeesSearchField.MIDDLE_NAME,
        EmployeesSearchField.BIRTHPLACE,
    ],
    genderIds: [],
    workingGroupIds: [],
    educationLevelIds: [],
    academicDegreeIds: [],
    birthdateMin: null,
    birthdateMax: null,
    isArchived: false,
    isRetired: null,
    tradeUnionDepartmentPaths: [],
    bntuDepartmentPaths: [],
    bntuPositionLabels: [],
    exemptionIds: [],
};
