import { IEmail } from "@/model";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { Field } from "@/view/primitives/fields/field/Field";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";

export interface IEmailFieldProps {
    item: IEmail;
    onChange: (item: IEmail) => void;
}

export function EmailField(props: IEmailFieldProps) {
    const { item, onChange } = props;

    const displayField = (
        <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
            <Typography.Text>{item.value}</Typography.Text>
            <Typography.Text type="secondary">{item.comment}</Typography.Text>
        </Flex>
    );

    const editField = (
        <Flex gap="small" style={{ width: "100%" }}>
            <Field title="Адрес">
                <InputField
                    value={item.value}
                    onChange={(value) => onChange({ ...item, value })}
                ></InputField>
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
