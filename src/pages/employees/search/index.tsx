import { FieldContainer } from "@/components/containers/field-container";
import { DateTimeField } from "@/components/fields/datetime";
import { SecondaryLabel } from "@/components/labels";
import { Palette } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { EmployeesSearchField } from "@/model";
import { EmployeesList } from "@/pages/employees/list";
import { Toolbar } from "@/pages/employees/viewer/toolbar";
import { SearchOutlined } from "@ant-design/icons";
import { Flex, Space, Button, Divider, Input, Select, DatePicker } from "antd";

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

    const isArchivedOptions = [
        { label: "На учёте", id: false },
        { label: "Снятые с учёта", id: true },
        { label: "Все", id: null },
    ];

    const isRetiredOptions = [
        { label: "Нет", id: false },
        { label: "Да", id: true },
        { label: "Все", id: null },
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
                            <FieldContainer title="Пол">
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
                            <FieldContainer title="Профгруппа">
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
                            <FieldContainer title="Образование">
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
                            <FieldContainer title="Учёная степень">
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
                            <FieldContainer title="Дата рождения">
                                <Flex style={{ width: "100%" }} gap="small">
                                    <Flex style={{ width: "50%" }}>
                                        <DateTimeField
                                            isEditable
                                            allowClear
                                            value={
                                                employeesListFilter.birthdateMin
                                            }
                                            onChange={(value) =>
                                                setEmployeesListFilter({
                                                    ...employeesListFilter,
                                                    birthdateMin: value,
                                                })
                                            }
                                            placeholder="От"
                                        ></DateTimeField>
                                    </Flex>
                                    <Flex style={{ width: "50%" }}>
                                        <DateTimeField
                                            isEditable
                                            allowClear
                                            value={
                                                employeesListFilter.birthdateMax
                                            }
                                            onChange={(value) =>
                                                setEmployeesListFilter({
                                                    ...employeesListFilter,
                                                    birthdateMax: value,
                                                })
                                            }
                                            placeholder="До"
                                        ></DateTimeField>
                                    </Flex>
                                </Flex>
                            </FieldContainer>
                            <Flex style={{ width: "100%" }} gap="small">
                                <Flex style={{ width: "50%" }}>
                                    <FieldContainer title="Профсоюзный учёт">
                                        <Select
                                            style={{
                                                width: "100%",
                                                textAlign: "left",
                                            }}
                                            placeholder="Все"
                                            allowClear
                                            value={
                                                employeesListFilter.isArchived
                                            }
                                            onChange={(isArchived) =>
                                                setEmployeesListFilter({
                                                    ...employeesListFilter,
                                                    isArchived,
                                                })
                                            }
                                            options={isArchivedOptions.map(
                                                (isArchived) => ({
                                                    label: isArchived.label,
                                                    value: isArchived.id,
                                                })
                                            )}
                                        ></Select>
                                    </FieldContainer>
                                </Flex>
                                <Flex style={{ width: "50%" }}>
                                    <FieldContainer title="Неработающие пенсионеры">
                                        <Select
                                            style={{
                                                width: "100%",
                                                textAlign: "left",
                                            }}
                                            placeholder="Все"
                                            allowClear
                                            value={
                                                employeesListFilter.isRetired
                                            }
                                            onChange={(isRetired) =>
                                                setEmployeesListFilter({
                                                    ...employeesListFilter,
                                                    isRetired,
                                                })
                                            }
                                            options={isRetiredOptions.map(
                                                (isRetired) => ({
                                                    label: isRetired.label,
                                                    value: isRetired.id,
                                                })
                                            )}
                                        ></Select>
                                    </FieldContainer>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Divider />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
