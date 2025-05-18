import { FieldContainer } from "@/components/containers/field-container";
import { SecondaryLabel } from "@/components/labels";
import { Palette } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { EmployeesFilterField } from "@/model";
import { EmployeesList } from "@/pages/employees/list";
import { Toolbar } from "@/pages/employees/viewer/toolbar";
import { SearchOutlined } from "@ant-design/icons";
import { Flex, Space, Button, Divider, Input, Select } from "antd";

export function EmployeesSearch() {
    const { fetchAllEmployees, employeesListFilter, setEmployeesListFilter } =
        useEmployees();

    const { search: searchQuery } = employeesListFilter;

    const { getEnumeration } = useEnumerations();

    function setSearchQuery(e) {
        setEmployeesListFilter({
            ...employeesListFilter,
            search: e.target.value,
        });
    }

    function setSearchFields(fields) {
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
                    <Input
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Поиск"
                    ></Input>
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
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Выберите поля"
                            value={employeesListFilter.searchFields}
                            onChange={setSearchFields}
                            options={searchFields.map((field) => ({
                                label: field.label,
                                value: field.id,
                            }))}
                        />
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
                            <FieldContainer title="Пол" name="genderIds">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: "100%", textAlign: "left" }}
                                    placeholder="Любой"
                                    value={employeesListFilter.genderIds}
                                    onChange={(genderIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            genderIds,
                                        })
                                    }
                                    options={genders.map((gender) => ({
                                        label: gender.label,
                                        value: gender.id,
                                    }))}
                                />
                            </FieldContainer>
                            <FieldContainer
                                title="Профгруппа"
                                name="workingGroupIds"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: "100%", textAlign: "left" }}
                                    placeholder="Любая"
                                    value={employeesListFilter.workingGroupIds}
                                    onChange={(workingGroupIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            workingGroupIds,
                                        })
                                    }
                                    options={workingGroups.map((group) => ({
                                        label: group.label,
                                        value: group.id,
                                    }))}
                                />
                            </FieldContainer>
                            <FieldContainer
                                title="Образование"
                                name="educationLevelIds"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: "100%", textAlign: "left" }}
                                    placeholder="Любой"
                                    value={
                                        employeesListFilter.educationLevelIds
                                    }
                                    onChange={(educationLevelIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            educationLevelIds,
                                        })
                                    }
                                    options={educationLevels.map((level) => ({
                                        label: level.label,
                                        value: level.id,
                                    }))}
                                />
                            </FieldContainer>
                            <FieldContainer
                                title="Учёная степень"
                                name="academicDegreeIds"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: "100%", textAlign: "left" }}
                                    placeholder="Любая"
                                    value={
                                        employeesListFilter.academicDegreeIds
                                    }
                                    onChange={(academicDegreeIds) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            academicDegreeIds,
                                        })
                                    }
                                    options={academicDegrees.map((degree) => ({
                                        label: degree.label,
                                        value: degree.id,
                                    }))}
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
