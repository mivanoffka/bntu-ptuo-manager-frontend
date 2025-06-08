import { FieldContainer } from "@/components/containers/field-container";
import { DateTimeField } from "@/components/fields/datetime";
import { MultipleSearchField } from "@/components/fields/multiple-search";
import { SearchField } from "@/components/fields/search";
import { transformPathToKey } from "@/components/fields/tree-select/utils";
import { SecondaryLabel } from "@/components/labels";
import { Palette } from "@/constants";
import { useEmployees } from "@/contexts/employees";
import { SearchSource } from "@/contexts/employees/constants";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { useTrees } from "@/contexts/trees";
import { TreeName } from "@/contexts/trees/constants";
import { EmployeesSearchField } from "@/model";
import { EmployeesList } from "@/pages/employees/list";
import { Toolbar } from "@/pages/employees/viewer/toolbar";
import { SearchOutlined } from "@ant-design/icons";
import {
    Flex,
    Space,
    Button,
    Divider,
    Input,
    Select,
    DatePicker,
    TreeSelect,
    Checkbox,
} from "antd";
import { useEffect, useState } from "react";

export function EmployeesSearch() {
    const {
        fetchAllEmployees,
        employeesListFilter,
        setEmployeesListFilter,
        searchFor,
    } = useEmployees();

    const { search: searchQuery } = employeesListFilter;

    const { getEnumeration } = useEnumerations();
    const { getTree } = useTrees();

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

    const bntuDepartments = getTree(TreeName.BNTU_DEPARTMENTS);
    const tradeUnionDepartments = getTree(TreeName.TRADE_UNION_DEPARTMENTS);

    const [includeNotArchived, setIncludeNotArchived] = useState(true);
    const [includeArchived, setIncludeArchived] = useState(false);

    const [includeRetired, setIncludeRetired] = useState(false);
    const [includeNotRetired, setIncludeNotRetired] = useState(true);

    useEffect(() => {
        if (includeArchived && includeNotArchived) {
            setEmployeesListFilter({
                ...employeesListFilter,
                isArchived: null,
            });
        } else {
            if (includeArchived) {
                setEmployeesListFilter({
                    ...employeesListFilter,
                    isArchived: true,
                });
            } else if (includeNotArchived) {
                setEmployeesListFilter({
                    ...employeesListFilter,
                    isArchived: false,
                });
            }
        }
    }, [includeArchived, includeNotArchived]);

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
        { label: "Любые", id: null },
    ];

    const isRetiredOptions = [
        { label: "Не входят", id: false },
        { label: "Входят", id: true },
        { label: "Любые", id: null },
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
                    {/* <FieldContainer title="Искать по">
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
                    </FieldContainer> */}
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
                            <FieldContainer title="Структура БНТУ">
                                <TreeSelect
                                    multiple
                                    treeData={transformPathToKey(
                                        bntuDepartments
                                    )}
                                    value={
                                        employeesListFilter.bntuDepartmentPaths
                                    }
                                    onChange={(bntuDepartmentPaths) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            bntuDepartmentPaths,
                                        })
                                    }
                                    treeCheckable={true}
                                    placeholder="Не выбрано"
                                    style={{ width: "100%", textAlign: "left" }}
                                    allowClear
                                />
                            </FieldContainer>
                            <FieldContainer title="Должность">
                                <MultipleSearchField
                                    isEditable
                                    value={
                                        employeesListFilter.bntuPositionLabels
                                    }
                                    onChange={(e) => {
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            bntuPositionLabels: e,
                                        });
                                    }}
                                    onSearch={(search: string | null) =>
                                        searchFor(
                                            SearchSource.BNTU_POSITIONS,
                                            search
                                        )
                                    }
                                />
                            </FieldContainer>
                            <Flex style={{ width: "100%" }} gap="small">
                                <FieldContainer title="На профсоюзном учёте">
                                    <Checkbox
                                        checked={includeNotArchived}
                                        onChange={(e) => {
                                            if (
                                                !e.target.checked &&
                                                !includeArchived
                                            ) {
                                                setIncludeArchived(true);
                                            }

                                            setIncludeNotArchived(
                                                e.target.checked
                                            );
                                        }}
                                    ></Checkbox>
                                </FieldContainer>

                                <FieldContainer title="Снятые с учёта">
                                    <Checkbox
                                        checked={includeArchived}
                                        onChange={(e) => {
                                            if (
                                                !e.target.checked &&
                                                !includeNotArchived
                                            ) {
                                                setIncludeNotArchived(true);
                                            }

                                            setIncludeArchived(
                                                e.target.checked
                                            );
                                        }}
                                    ></Checkbox>
                                </FieldContainer>
                            </Flex>

                            <FieldContainer title="Структура ЦПО">
                                <TreeSelect
                                    multiple
                                    treeData={transformPathToKey(
                                        tradeUnionDepartments
                                    )}
                                    value={
                                        employeesListFilter.tradeUnionDepartmentPaths
                                    }
                                    onChange={(tradeUnionDepartmentPaths) =>
                                        setEmployeesListFilter({
                                            ...employeesListFilter,
                                            tradeUnionDepartmentPaths,
                                        })
                                    }
                                    treeCheckable={true}
                                    placeholder="Не выбрано"
                                    style={{ width: "100%", textAlign: "left" }}
                                    allowClear
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
                            <Flex
                                align="left"
                                style={{ width: "100%" }}
                                gap="small"
                            >
                                <FieldContainer horizontal title="Трудящиеся">
                                    <Checkbox
                                        checked={includeNotRetired}
                                        onChange={(e) => {
                                            if (
                                                !e.target.checked &&
                                                !includeRetired
                                            ) {
                                                setIncludeRetired(true);
                                            }

                                            setIncludeNotRetired(
                                                e.target.checked
                                            );
                                        }}
                                    ></Checkbox>
                                </FieldContainer>
                                <FieldContainer
                                    horizontal
                                    title="Неработающие пенсионеры"
                                >
                                    <Checkbox
                                        checked={includeRetired}
                                        onChange={(e) => {
                                            if (
                                                !e.target.checked &&
                                                !includeNotRetired
                                            ) {
                                                setIncludeNotRetired(true);
                                            }

                                            setIncludeRetired(e.target.checked);
                                        }}
                                    ></Checkbox>
                                </FieldContainer>
                            </Flex>

                            <Flex style={{ width: "100%" }} gap="small">
                                <FieldContainer title="Дата рождения (от)">
                                    <DateTimeField
                                        isEditable
                                        allowClear
                                        value={employeesListFilter.birthdateMin}
                                        onChange={(value) =>
                                            setEmployeesListFilter({
                                                ...employeesListFilter,
                                                birthdateMin: value,
                                            })
                                        }
                                    ></DateTimeField>
                                </FieldContainer>
                                <FieldContainer title="Дата рождения (до)">
                                    <DateTimeField
                                        isEditable
                                        allowClear
                                        value={employeesListFilter.birthdateMax}
                                        onChange={(value) =>
                                            setEmployeesListFilter({
                                                ...employeesListFilter,
                                                birthdateMax: value,
                                            })
                                        }
                                    ></DateTimeField>
                                </FieldContainer>
                            </Flex>

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
                        </Flex>

                        <Divider />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
