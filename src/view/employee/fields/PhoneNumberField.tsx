import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { item, PhoneNumber } from "@/model";
import { CombinedField } from "@/view/field/CombinedField";
import { Field } from "@/view/field/Field";
import { Label } from "@/view/field/Label";
import { TextInput } from "@/view/field/TextInput";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";

export interface IPhoneNumberFieldProps {
    item: PhoneNumber;
    onChange: (item: PhoneNumber) => void;
}

export function PhoneNumberField(props: IPhoneNumberFieldProps) {
    const { item, onChange } = props;

    const displayField = (
        <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
            <Typography.Text>{item.value}</Typography.Text>
            <Flex style={{ width: "50%" }}>
                <Typography.Text type="secondary">
                    {item.comment}
                </Typography.Text>
            </Flex>
        </Flex>
    );

    const editField = (
        <Flex gap="small" style={{ width: "100%" }}>
            <Field title="Адрес">
                <TextInput
                    value={item.value}
                    onChange={(value) => onChange({ ...item, value })}
                ></TextInput>
            </Field>
            <Field title="Комментарий">
                <TextInput
                    value={item.comment}
                    onChange={(comment) => onChange({ ...item, comment })}
                ></TextInput>
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
