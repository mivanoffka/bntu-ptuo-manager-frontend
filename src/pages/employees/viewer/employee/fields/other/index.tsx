import { FieldContainer } from "@/components/containers";
import { IListedItemProps } from "@/components/listed";
import { DateTimeField } from "@/components/fields/datetime";
import { SelectField } from "@/components/fields/select";
import { TextField } from "@/components/fields/text";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { Flex, Form } from "antd";
import dayjs from "dayjs";
import { useEmployees } from "@/contexts/employees";
import Search from "antd/es/transfer/search";
import { SearchField } from "@/components/fields/search";
import { SearchSource } from "@/contexts/employees/constants";
import { IFieldProps } from "@/components/fields/shared";

export function CommentField(props: IListedItemProps) {
    const { index, isEditable } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Комментарий">
                <Form.Item
                    name={[index, "value"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
        </Flex>
    );
}

export function ExemptionsField(props: IFieldProps) {
    const { isEditable } = props;

    const { getEnumeration } = useEnumerations();
    const exemptions = getEnumeration(EnumerationName.EXEMPTIONS);

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Льготы">
                <Form.Item name={"exemptionIds"}>
                    <SelectField
                        isEditable={isEditable}
                        isMultiple
                        options={exemptions.map((item) => ({
                            value: item.id,
                            label: item.label,
                        }))}
                    />
                </Form.Item>
            </FieldContainer>
        </Flex>
    );
}

export function RewardField(props: IListedItemProps) {
    const { index, isEditable } = props;

    const { searchFor } = useEmployees();

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Название">
                    <Form.Item
                        name={[index, "label"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <SearchField
                            isEditable={isEditable}
                            onSearch={(search: string | null) =>
                                searchFor(SearchSource.REWARDS, search)
                            }
                        />
                    </Form.Item>
                </FieldContainer>
                <FieldContainer title="Дата присуждения">
                    <Form.Item
                        name={[index, "grantedAt"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <DateTimeField isEditable={isEditable}></DateTimeField>
                    </Form.Item>
                </FieldContainer>
            </Flex>
            <Flex style={{ width: "100%" }}>
                <FieldContainer title="Комментарий">
                    <Form.Item name={[index, "comment"]}>
                        <TextField isEditable={isEditable}></TextField>
                    </Form.Item>
                </FieldContainer>
            </Flex>
        </Flex>
    );
}

export function RelativeField(props: IListedItemProps) {
    const { index, isEditable } = props;

    const { getEnumeration } = useEnumerations();
    const relativeTypes = getEnumeration(EnumerationName.RELATIVE_TYPES);

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <FieldContainer title="ФИО">
                    <Form.Item
                        name={[index, "fullName"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <TextField isEditable={isEditable} />
                    </Form.Item>
                </FieldContainer>
            </Flex>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Дата рождения">
                    <Form.Item
                        name={[index, "birthdate"]}
                        rules={[{ required: true, message: "" }]}
                        normalize={(value?: dayjs.Dayjs) =>
                            value?.toISOString()
                        }
                    >
                        <DateTimeField isEditable={isEditable}></DateTimeField>
                    </Form.Item>
                </FieldContainer>
                <FieldContainer title="Родство">
                    <Form.Item
                        name={[index, "relativeTypeId"]}
                        rules={[{ required: true, message: "" }]}
                    >
                        <SelectField
                            isEditable={isEditable}
                            options={relativeTypes.map((item) => ({
                                value: item.id,
                                label: item.label,
                            }))}
                        ></SelectField>
                    </Form.Item>
                </FieldContainer>
            </Flex>
            <Flex style={{ width: "100%" }}>
                <FieldContainer title="Комментарий">
                    <Form.Item name={[index, "comment"]}>
                        <TextField isEditable={isEditable}></TextField>
                    </Form.Item>
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
