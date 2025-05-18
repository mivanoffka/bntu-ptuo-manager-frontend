import { FieldContainer } from "@/components/containers";
import { transformPathToKey } from "@/components/fields/tree-select/utils";
import { IListedItemProps } from "@/components/listed";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { useTrees } from "@/contexts/trees";
import { TreeName } from "@/contexts/trees/constants";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox, DatePicker, Flex, Select, TreeSelect } from "antd";

export function TradeUnionDepartmentField() {
    const { getTree } = useTrees();

    const tree = getTree(TreeName.TRADE_UNION_DEPARTMENTS);

    return (
        <FieldContainer
            title="Подразделение"
            rules={[{ required: true, message: "" }]}
            name={"tradeUnionDepartmentPath"}
        >
            <TreeSelect
                className="fixed-width-tree-select"
                showSearch
                style={{
                    width: "100%",
                    textAlign: "left",
                }}
                dropdownStyle={{
                    maxHeight: 400,
                    minWidth: 300,
                    overflow: "auto",
                }}
                treeData={transformPathToKey(tree)}
                treeLine
                switcherIcon={<DownOutlined />}
            />
        </FieldContainer>
    );
}

export function WorkingGroupField() {
    const { getEnumeration } = useEnumerations();
    const workingGroups = getEnumeration(EnumerationName.WORKING_GROUPS);

    return (
        <FieldContainer
            title="Профгруппа"
            rules={[{ required: true, message: "" }]}
            name={"workingGroupId"}
        >
            <Select
                style={{ textAlign: "left", width: "100%" }}
                options={workingGroups.map((item) => ({
                    value: item.id,
                    label: item.label,
                }))}
                allowClear
            />
        </FieldContainer>
    );
}

export function TradeUnionInfoField() {
    return (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer
                        title="Дата вступления"
                        name={"joinedAt"}
                        rules={[{ required: true, message: "" }]}
                    >
                        <DatePicker
                            allowClear
                            format="DD MMMM YYYY"
                            style={{ width: "100%" }}
                        />
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer
                        title="Дата постановки на учёт"
                        name={"recordedAt"}
                        rules={[{ required: true, message: "" }]}
                    >
                        <DatePicker
                            allowClear
                            format="DD MMMM YYYY"
                            style={{ width: "100%" }}
                        />
                    </FieldContainer>
                </Flex>
            </Flex>

            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer
                        title="Неработающий пенсионер"
                        name={"isRetired"}
                    >
                        <Checkbox />
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer
                        title="Дата выхода на пенсию"
                        name={"retiredAt"}
                    >
                        <DatePicker
                            allowClear
                            format="DD MMMM YYYY"
                            style={{ width: "100%" }}
                        />
                    </FieldContainer>
                </Flex>
            </Flex>

            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer title="Снят(а) с учёта" name={"isArchived"}>
                        <Checkbox />
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer
                        title="Дата снятия с учёта"
                        name={"archivedAt"}
                    >
                        <DatePicker
                            allowClear
                            format="DD MMMM YYYY"
                            style={{ width: "100%" }}
                        />
                    </FieldContainer>
                </Flex>
            </Flex>
        </Flex>
    );
}
