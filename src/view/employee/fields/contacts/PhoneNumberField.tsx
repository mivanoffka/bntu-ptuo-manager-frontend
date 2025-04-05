import { IPhoneNumber } from "@/model";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { FieldTitle, SelectField } from "@/view/primitives";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { Commented } from "@/view/primitives/containers";

export interface IPhoneNumberFieldProps {
    item: IPhoneNumber;
    onChange: (value: IPhoneNumber) => void;
}

export function PhoneNumberField(props: IPhoneNumberFieldProps) {
    const { item, onChange } = props;
    const { phoneNumberTypes } = useEnumerations();

    const displayField = (
        <Commented comment={item.comment}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Typography.Text>{item.value}</Typography.Text>
                <FieldTitle>
                    <SelectField.Display
                        selectedId={item.phoneNumberTypeId}
                        enumeration={phoneNumberTypes}
                    ></SelectField.Display>
                </FieldTitle>
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
                    selectedId={item.phoneNumberTypeId}
                    onChange={(phoneNumberTypeId) =>
                        onChange({ ...item, phoneNumberTypeId })
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
