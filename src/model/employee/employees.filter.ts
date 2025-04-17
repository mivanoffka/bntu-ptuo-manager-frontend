export const enum EmployeesFilterField {
    FIRST_NAME = "firstName",
    LAST_NAME = "lastName",
    MIDDLE_NAME = "middleName",
    BIRTHPLACE = "birthplace",
}

export interface IEmployeesFilter {
    search: string | null;
    searchFields: EmployeesFilterField[];
    genderIds: number[];
    workingGroupIds: number[];
    educationLevelIds: number[];
    academicDegreeIds: number[];
}

export const DEFAULT_FILTER = {
    search: null,
    searchFields: [],
    genderIds: [],
    workingGroupIds: [],
    educationLevelIds: [],
    academicDegreeIds: [],
};
