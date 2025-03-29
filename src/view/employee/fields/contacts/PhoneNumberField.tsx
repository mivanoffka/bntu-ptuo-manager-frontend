import { PhoneNumber } from "@/model";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { SelectField } from "@/view/primitives";

export interface IPhoneNumberFieldProps {
    item: PhoneNumber;
    onChange: (value: PhoneNumber) => void;
}

export function PhoneNumberField(props: IPhoneNumberFieldProps) {
    const { item, onChange } = props;

    const displayField = (
        <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
            <Typography.Text>{item.value}</Typography.Text>
            <SelectField.Display value={item.type} />
            <Typography.Text type="secondary">{item.comment}</Typography.Text>
        </Flex>
    );

    const editField = (
        <Flex gap="small" style={{ width: "100%" }}>
            <Field title="Номер">
                <InputField
                    value={item.value}
                    onChange={(value) => onChange({ ...item, value })}
                ></InputField>
            </Field>
            <Field title="Тип">
                <SelectField.Edit
                    value={item.type}
                    onChange={(type) => onChange({ ...item, type })}
                    enumeration={[
                        { label: "Мобильный", value: 0 },
                        { label: "Домашний", value: 1 },
                    ]}
                ></SelectField.Edit>
            </Field>
            <Field title="Комментарий">
                <InputField
                    value={item.comment}
                    onChange={(comment) => onChange({ ...item, comment })}
                ></InputField>
            </Field>
        </Flex>
    );

    return (
        <CombinedField
            displayField={displayField}
            editField={editField}
        ></CombinedField>
    );
}
