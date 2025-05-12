export const enum EmployeesFilterField {
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    MIDDLE_NAME = "middle_name",
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
    searchFields: [
        EmployeesFilterField.LAST_NAME,
        EmployeesFilterField.FIRST_NAME,
        EmployeesFilterField.MIDDLE_NAME,
    ],
    genderIds: [],
    workingGroupIds: [],
    educationLevelIds: [],
    academicDegreeIds: [],
};
