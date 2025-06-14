import { FieldContainer } from "@/components/containers";
import { DateTimeField } from "@/components/fields/datetime";
import { TextField } from "@/components/fields/text";
import { TreeSelectField } from "@/components/fields/tree-select";
import { IListedItemProps } from "@/components/listed";
import { useTrees } from "@/contexts/trees";
import { TreeName } from "@/contexts/trees/constants";
import { transformPathToKey } from "@/components/fields/tree-select/utils";
import { Flex, Form } from "antd";
import { CheckboxField } from "@/components/fields/checkbox";
import { SearchField } from "@/components/fields/search";
import { useEmployees } from "@/contexts/employees";
import { SearchSource } from "@/contexts/employees/constants";

export function BntuPositionField(props: IListedItemProps) {
    const { index, isEditable } = props;
    const { getTree } = useTrees();
    const { searchFor } = useEmployees();
    const tree = getTree(TreeName.BNTU_DEPARTMENTS);
    const form = Form.useFormInstance();

    const treeData = transformPathToKey(tree);

    const isDischarged = Form.useWatch(
        ["bntuPositions", index, "isDischarged"],
        form
    );
    const isDischargedVoluntarily = Form.useWatch(
        ["bntuPositions", index, "isDischargedVoluntarily"],
        form
    );

    const isCommentVisible = isDischarged === true && !isDischargedVoluntarily;
    const isDischargementDateVisible = isDischarged === true;
    const isDischargedVoluntarilyVisible = isDischarged === true;

    console.log(isDischarged);

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Должность">
                    <Form.Item
                        name={[index, "label"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <SearchField
                            isEditable={isEditable}
                            onSearch={(search: string | null) =>
                                searchFor(SearchSource.BNTU_POSITIONS, search)
                            }
                        />
                    </Form.Item>
                </FieldContainer>
                <FieldContainer title="Подразделение">
                    <Form.Item
                        name={[index, "bntuDepartmentPath"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <TreeSelectField
                            isEditable={isEditable}
                            treeData={treeData}
                            showSearch
                            style={{ width: "100%" }}
                            dropdownStyle={{
                                maxHeight: 400,
                                minWidth: 300,
                                overflow: "auto",
                            }}
                            treeLine
                            allowClear
                        />
                    </Form.Item>
                </FieldContainer>
                <FieldContainer title="Дата назначения">
                    <Form.Item
                        name={[index, "hiredAt"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <DateTimeField isEditable={isEditable} />
                    </Form.Item>
                </FieldContainer>
            </Flex>

            {(isEditable || isDischarged) && (
                <Flex vertical>
                    <Flex gap="small" style={{ width: "100%" }}>
                        <FieldContainer title="Уволен">
                            <Form.Item
                                name={[index, "isDischarged"]}
                                valuePropName="checked"
                            >
                                <CheckboxField isEditable={isEditable} />
                            </Form.Item>
                        </FieldContainer>
                        {isDischargedVoluntarilyVisible && (
                            <FieldContainer title="По собств. желанию">
                                <Form.Item
                                    name={[index, "isDischargedVoluntarily"]}
                                    valuePropName="checked"
                                >
                                    <CheckboxField isEditable={isEditable} />
                                </Form.Item>
                            </FieldContainer>
                        )}
                        {isDischargementDateVisible && (
                            <FieldContainer title="Дата увольнения">
                                <Form.Item
                                    name={[index, "dischargedAt"]}
                                    rules={[
                                        {
                                            required: isDischarged,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <DateTimeField
                                        disabled={!isDischarged}
                                        isEditable={isEditable}
                                    />
                                </Form.Item>
                            </FieldContainer>
                        )}
                    </Flex>
                    {isCommentVisible && (
                        <Flex gap="small" style={{ width: "100%" }}>
                            <FieldContainer title="Комментарий (причина увольнения)">
                                <Form.Item
                                    name={[index, "dischargementComment"]}
                                    rules={[
                                        {
                                            required: isCommentVisible,
                                            message: "",
                                        },
                                    ]}
                                >
                                    <TextField isEditable={isEditable} />
                                </Form.Item>
                            </FieldContainer>
                        </Flex>
                    )}
                </Flex>
            )}
        </Flex>
    );
}
