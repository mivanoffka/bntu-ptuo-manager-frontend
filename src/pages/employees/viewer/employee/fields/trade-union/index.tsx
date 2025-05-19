import { FieldContainer } from "@/components/containers";
import { CheckboxField } from "@/components/fields/checkbox";
import { DateTimeField } from "@/components/fields/datetime";
import { SelectField } from "@/components/fields/select";
import { TreeSelectField } from "@/components/fields/tree-select";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { useTrees } from "@/contexts/trees";
import { TreeName } from "@/contexts/trees/constants";
import { transformPathToKey } from "@/components/fields/tree-select/utils";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { Flex, Form } from "antd";
import { IFieldProps } from "@/components/fields/shared";

export function TradeUnionDepartmentField(props: IFieldProps) {
    const { isEditable } = props;
    const { getTree } = useTrees();
    const tree = getTree(TreeName.TRADE_UNION_DEPARTMENTS);
    const treeData = transformPathToKey(tree);

    return (
        <FieldContainer title="Подразделение">
            <Form.Item
                name="tradeUnionDepartmentPath"
                rules={[{ required: true, message: "" }]}
            >
                <TreeSelectField
                    isEditable={isEditable}
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
                    treeData={treeData}
                    treeLine
                />
            </Form.Item>
        </FieldContainer>
    );
}

export function WorkingGroupField(props: IFieldProps) {
    const { isEditable } = props;
    const { getEnumeration } = useEnumerations();
    const workingGroups = getEnumeration(EnumerationName.WORKING_GROUPS);

    return (
        <FieldContainer title="Профгруппа">
            <Form.Item
                name="workingGroupId"
                rules={[{ required: true, message: "" }]}
            >
                <SelectField
                    isEditable={isEditable}
                    style={{ textAlign: "left", width: "100%" }}
                    options={workingGroups.map((item) => ({
                        value: item.id,
                        label: item.label,
                    }))}
                    allowClear
                />
            </Form.Item>
        </FieldContainer>
    );
}

export function TradeUnionInfoField(props: IFieldProps) {
    const { isEditable } = props;

    return (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer title="Дата вступления">
                        <Form.Item
                            name="joinedAt"
                            rules={[{ required: true, message: "" }]}
                        >
                            <DateTimeField isEditable={isEditable} allowClear />
                        </Form.Item>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer title="Дата постановки на учёт">
                        <Form.Item
                            name="recordedAt"
                            rules={[{ required: true, message: "" }]}
                        >
                            <DateTimeField isEditable={isEditable} />
                        </Form.Item>
                    </FieldContainer>
                </Flex>
            </Flex>

            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer title="Неработающий пенсионер">
                        <Form.Item name="isRetired">
                            <CheckboxField isEditable={isEditable} />
                        </Form.Item>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer title="Дата выхода на пенсию">
                        <Form.Item name="retiredAt">
                            <DateTimeField isEditable={isEditable} />
                        </Form.Item>
                    </FieldContainer>
                </Flex>
            </Flex>

            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer title="Снят(а) с учёта">
                        <Form.Item name="isArchived">
                            <CheckboxField isEditable={isEditable} />
                        </Form.Item>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer title="Дата снятия с учёта">
                        <Form.Item name="archivedAt">
                            <DateTimeField isEditable={isEditable} />
                        </Form.Item>
                    </FieldContainer>
                </Flex>
            </Flex>
        </Flex>
    );
}
