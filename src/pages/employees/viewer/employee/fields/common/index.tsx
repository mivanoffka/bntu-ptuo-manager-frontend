import { FieldContainer } from "@/components/containers";
import { DateTimeField } from "@/components/fields/datetime";
import { SelectField } from "@/components/fields/select";
import { IFieldProps, NOT_NULL_RULES } from "@/components/fields/shared";
import { TextField } from "@/components/fields/text";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { Flex, Form } from "antd";

export function BirthdateField(props: IFieldProps) {
    const { isEditable } = props;

    return (
        <FieldContainer title="Дата рождения">
            <Form.Item name="birthdate" rules={NOT_NULL_RULES}>
                <DateTimeField isEditable={isEditable}></DateTimeField>
            </Form.Item>
        </FieldContainer>
    );
}

export function BirthplaceField(props: IFieldProps) {
    const { isEditable } = props;

    return (
        <FieldContainer title="Место рождения">
            <Form.Item name="birthplace" rules={NOT_NULL_RULES}>
                <TextField isEditable={isEditable}></TextField>
            </Form.Item>
        </FieldContainer>
    );
}

export function FullNameField(props: IFieldProps) {
    const { isEditable } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Фамилия">
                <Form.Item
                    name="lastName"
                    rules={[{ required: true, message: "" }]}
                >
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
            <FieldContainer title="Имя">
                <Form.Item
                    name="firstName"
                    rules={[{ required: true, message: "" }]}
                >
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
            <FieldContainer title="Отчество">
                <Form.Item name="middleName">
                    <TextField isEditable={isEditable}></TextField>
                </Form.Item>
            </FieldContainer>
        </Flex>
    );
}

export function GenderField(props: IFieldProps) {
    const { isEditable } = props;

    const { getEnumeration } = useEnumerations();
    const genders = getEnumeration(EnumerationName.GENDERS);

    return (
        <FieldContainer title="Пол">
            <Form.Item
                name="genderId"
                rules={[{ required: true, message: "" }]}
            >
                <SelectField
                    isEditable={isEditable}
                    options={genders.map((item) => ({
                        value: item.id,
                        label: item.label,
                    }))}
                ></SelectField>
            </Form.Item>
        </FieldContainer>
    );
}
