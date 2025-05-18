import { FieldContainer } from "@/components/containers";
import { IListedItemProps } from "@/components/listed";
import { SelectField } from "@/components/fields/select";
import { TextField } from "@/components/fields/text";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { Flex, Form } from "antd";

export function AddressField(props: IListedItemProps) {
    const { index, isEditable } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Адрес">
                <Form.Item
                    name={[index, "value"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
            <FieldContainer title="Комментарий">
                <Form.Item name={[index, "comment"]}>
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
        </Flex>
    );
}

export function EmailField(props: IListedItemProps) {
    const { index, isEditable } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Адрес">
                <Form.Item
                    name={[index, "value"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
            <FieldContainer title="Комментарий">
                <Form.Item name={[index, "comment"]}>
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
        </Flex>
    );
}

export function PhoneNumberField(props: IListedItemProps) {
    const { index, isEditable } = props;

    const { getEnumeration } = useEnumerations();
    const phoneNumberTypes = getEnumeration(EnumerationName.PHONE_NUMBER_TYPES);

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Номер">
                <Form.Item
                    name={[index, "value"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
            <FieldContainer title="Тип">
                <Form.Item
                    name={[index, "phoneNumberTypeId"]}
                    rules={[{ required: true, message: "" }]}
                >
                    <SelectField
                        isEditable={isEditable}
                        options={phoneNumberTypes.map((item) => ({
                            value: item.id,
                            label: item.label,
                        }))}
                    ></SelectField>
                </Form.Item>
            </FieldContainer>
            <FieldContainer title="Комментарий">
                <Form.Item name={[index, "comment"]}>
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
        </Flex>
    );
}
