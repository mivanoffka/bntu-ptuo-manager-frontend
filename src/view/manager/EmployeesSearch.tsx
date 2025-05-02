import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Input, Select, Space } from "antd";
import { Palette } from "@/view/constants";

import { Toolbar } from "@/view/manager/toolbar/Toolbar";
import { EmployeesList } from "@/view/manager/EmployeesList";
import { useEmployees } from "@/controller/employee";
import {
    Expandable,
    FieldContainer,
    InputField,
    SecondaryLabel,
    SelectField,
} from "@/view/primitives";
import { EmployeesFilterField } from "@/model/employee/employees.filter";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { EnumerationName } from "@/controller/enumerations/constants";

export function EmployeesSearch() {
    const { fetchAllEmployees, employeesListFilter, setEmployeesListFilter } =
        useEmployees();

    const { search: searchQuery } = employeesListFilter;

    const { getEnumeration } = useEnumerations();

    function setSearchQuery(query: string | null) {
        setEmployeesListFilter({ ...employeesListFilter, search: query });
    }

    function setSearchFields(fields: EmployeesFilterField[]) {
        setEmployeesListFilter({
            ...employeesListFilter,
            searchFields: fields,
        });
    }

    const workingGroups = getEnumeration(EnumerationName.WORKING_GROUPS);
    const educationLevels = getEnumeration(EnumerationName.EDUCATION_LEVELS);
    const academicDegrees = getEnumeration(EnumerationName.ACADEMIC_DEGREES);
    const genders = getEnumeration(EnumerationName.GENDERS);

    const searchFields = [
        { label: "Имя", id: "first_name" },
        { label: "Фамилия", id: "last_name" },
        { label: "Отчество", id: "middle_name" },
        { label: "Место рождения", id: "birthplace" },
        { label: "Должность", id: "bntu_positions__label" },
    ];

    return (
        <Flex align="center" vertical style={{ width: "100%", height: "100%" }}>
            <Toolbar>
                <Space.Compact style={{ width: "100%" }}>
                    <InputField
                        editModeEnabled
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Поиск"
                    ></InputField>
                    <Button
                        onClick={fetchAllEmployees}
                        style={{ color: Palette.BLUE }}
                    >
                        <SearchOutlined />
                    </Button>
                </Space.Compact>
            </Toolbar>
            <Flex
                align="center"
                vertical
                gap="middle"
                style={{ width: "100%", height: "90%" }}
            >
                <Flex
                    align="center"
                    vertical
                    style={{ width: "90%", height: "50%" }}
                >
                    <EmployeesList></EmployeesList>
                </Flex>
                <Flex
                    align="center"
                    vertical
                    style={{ width: "90%", height: "50%" }}
                >
                    <FieldContainer title="Искать по">
                        <SelectField
                            multiple
                            editModeEnabled
                            selectedIds={employeesListFilter.searchFields}
                            onChange={setSearchFields}
                            enumeration={searchFields}
                        ></SelectField>
                    </FieldContainer>
                    <Flex
                        vertical
                        align="center"
                        style={{ width: "100%", overflow: "auto" }}
                    >
                        <Divider orientation="center">
                            {<SecondaryLabel>Фильтрация</SecondaryLabel>}
                        </Divider>
                        <Flex
                            vertical
                            align="center"
                            gap="small"
                            style={{ width: "100%", overflow: "auto" }}
                        >
                            <FieldContainer title="Пол">
                                <SelectField
                                    placeholder="Любой"
                                    multiple
                                    editModeEnabled
                                    selectedIds={employeesListFilter.genderIds}
                                    onChange={(genderIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            genderIds,
                                        })
                                    }
                                    enumeration={genders}
                                ></SelectField>
                            </FieldContainer>
                            <FieldContainer title="Профгруппа">
                                <SelectField
                                    placeholder="Любая"
                                    multiple
                                    editModeEnabled
                                    selectedIds={
                                        employeesListFilter.workingGroupIds
                                    }
                                    onChange={(workingGroupIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            workingGroupIds,
                                        })
                                    }
                                    enumeration={workingGroups}
                                ></SelectField>
                            </FieldContainer>
                            <FieldContainer title="Образование">
                                <SelectField
                                    placeholder="Любой"
                                    multiple
                                    editModeEnabled
                                    selectedIds={
                                        employeesListFilter.educationLevelIds
                                    }
                                    onChange={(educationLevelIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            educationLevelIds,
                                        })
                                    }
                                    enumeration={educationLevels}
                                />
                            </FieldContainer>
                            <FieldContainer title="Учёная степень">
                                <SelectField
                                    placeholder="Любая"
                                    multiple
                                    editModeEnabled
                                    selectedIds={
                                        employeesListFilter.academicDegreeIds
                                    }
                                    onChange={(academicDegreeIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            academicDegreeIds,
                                        })
                                    }
                                    enumeration={academicDegrees}
                                />
                            </FieldContainer>
                        </Flex>

                        <Divider />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
