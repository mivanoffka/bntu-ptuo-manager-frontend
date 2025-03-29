import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { DatePicker, Flex, Typography } from "antd";
import { Reward } from "@/model";
import { Commented } from "@/view/primitives/containers";
import { Field, FieldTitle } from "@/view/primitives";
import dayjs from "dayjs";

export interface IRewardFieldProps {
    item: Reward;
    onChange: (item: Reward) => void;
}

export function RewardField(props: IRewardFieldProps) {
    const { item, onChange } = props;

    const displayField = (
        <Commented comment={item.comment}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Typography.Text>{item.label}</Typography.Text>
                <FieldTitle>
                    {dayjs(item.grantedAt).format("DD.MM.YYYY")}
                </FieldTitle>
            </Flex>
        </Commented>
    );

    const editField = (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex gap="small" style={{ width: "100%" }}>
                <Field title="Название">
                    <InputField
                        value={item.label}
                        onChange={(label) => onChange({ ...item, label })}
                    ></InputField>
                </Field>
                <Field title="Дата присуждения">
                    <DatePicker
                        size="small"
                        value={item.grantedAt}
                        onChange={(grantedAt) =>
                            onChange({ ...item, grantedAt })
                        }
                    ></DatePicker>
                </Field>
            </Flex>

            <Flex style={{ width: "100%" }}>
                <Field title="Комментарий">
                    <InputField
                        value={item.comment}
                        onChange={(comment) => onChange({ ...item, comment })}
                    ></InputField>
                </Field>
            </Flex>
        </Flex>
    );

    return (
        <CombinedField
            displayField={displayField}
            editField={editField}
        ></CombinedField>
    );
}
