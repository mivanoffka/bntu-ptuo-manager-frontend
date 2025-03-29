import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { useEmployeeUpdater } from "@/controller/employee/EmployeeUpdaterContext";
import { Email } from "@/model";
import { CombinedField } from "@/view/field/CombinedField";
import { Field } from "@/view/field/Field";
import { Label } from "@/view/field/Label";
import { TextInput } from "@/view/field/TextInput";
import { VBox } from "@/view/utils";
import { DatePicker, Flex, Input, Typography } from "antd";
import dayjs from "dayjs";

export interface IEmailFieldProps {
    item: Email;
    onChange: (email: Email) => void;
}

export function EmailField(props: IEmailFieldProps) {
    const { item: email, onChange } = props;

    const displayField = (
        <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
            <Typography.Text>{email.value}</Typography.Text>
            <Typography.Text type="secondary">{email.comment}</Typography.Text>
        </Flex>
    );

    const editField = (
        <Flex gap="small" style={{ width: "100%" }}>
            <Field title="Адрес">
                <TextInput
                    value={email.value}
                    onChange={(value) => onChange({ ...email, value })}
                ></TextInput>
            </Field>
            <Field title="Комментарий">
                <TextInput
                    value={email.comment}
                    onChange={(comment) => onChange({ ...email, comment })}
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
