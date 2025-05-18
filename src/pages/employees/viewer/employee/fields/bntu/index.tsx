import { FieldContainer } from "@/components/containers/field-container";
import { BooleanField } from "@/components/fields/boolean";
import { DateTimeField } from "@/components/fields/datetime";
import { TextField } from "@/components/fields/text";
import { SelectTreeField } from "@/components/fields/tree-select";
import { transformPathToKey } from "@/components/fields/tree-select/utils";
import { IListedItemProps } from "@/components/listed";
import { useTrees } from "@/contexts/trees";
import { TreeName } from "@/contexts/trees/constants";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox, DatePicker, Flex, Form, Input, TreeSelect } from "antd";
import dayjs from "dayjs";

export function BntuPositionField(props: IListedItemProps) {
    const { index } = props;

    const { getTree } = useTrees();

    const tree = getTree(TreeName.BNTU_DEPARTMENTS);

    return (
        <Flex vertical gap="small" align="center" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer
                        title="Должность"
                        name={[index, "label"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <Input allowClear></Input>
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer
                        title="Подразделение"
                        rules={[{ required: true, message: "" }]}
                        name={[index, "bntuDepartmentPath"]}
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
                </Flex>
                <Flex style={{ width: "33%" }}>
                    <FieldContainer
                        title="Дата назначения"
                        name={[index, "hiredAt"]}
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
                        title="Уволен"
                        name={[index, "isDischarged"]}
                    >
                        <Checkbox />
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer
                        title="По собственному желанию"
                        name={[index, "isDischargedVoluntarily"]}
                    >
                        <Checkbox />
                    </FieldContainer>
                </Flex>
                <Flex style={{ width: "50%" }}>
                    <FieldContainer
                        title="Дата увольнения"
                        name={[index, "dischargedAt"]}
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
                <Flex style={{ width: "100%" }}>
                    <FieldContainer
                        title="Комментарий (причина увольнения)"
                        name={[index, "comment"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <Input allowClear></Input>
                    </FieldContainer>
                </Flex>
            </Flex>
        </Flex>
    );
}
