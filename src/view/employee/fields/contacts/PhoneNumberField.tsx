import { PhoneNumber } from "@/model";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { FieldTitle, SelectField } from "@/view/primitives";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { Commented } from "@/view/primitives/containers";

export interface IPhoneNumberFieldProps {
    item: PhoneNumber;
    onChange: (value: PhoneNumber) => void;
}

export function PhoneNumberField(props: IPhoneNumberFieldProps) {
    const { item, onChange } = props;
    const { phoneNumberTypes } = useEnumerations();

    console.log(item);

    const displayField = (
        <Commented comment={item.comment}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Typography.Text>{item.value}</Typography.Text>
                <FieldTitle>{item.phoneNumberType?.label}</FieldTitle>
            </Flex>
        </Commented>
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
                    value={item.phoneNumberType}
                    onChange={(phoneNumberType) =>
                        onChange({ ...item, phoneNumberType })
                    }
                    enumeration={phoneNumberTypes}
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
