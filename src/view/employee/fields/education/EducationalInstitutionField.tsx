import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { DatePicker, Flex, Typography } from "antd";
import { EducationalInstitution } from "@/model";
import { Commented } from "@/view/primitives/containers";
import { Field, FieldTitle } from "@/view/primitives";
import dayjs from "dayjs";

export interface IEducationalInstitutionFieldProps {
    item: EducationalInstitution;
    onChange: (item: EducationalInstitution) => void;
}

export function EducationalInstitutionField(
    props: IEducationalInstitutionFieldProps
) {
    const { item, onChange } = props;

    const displayField = (
        <Commented comment={item.comment}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Typography.Text>{item.label}</Typography.Text>
                {item.graduatedAt && (
                    <FieldTitle>
                        окончено в {dayjs(item.graduatedAt).format("YYYY")}
                    </FieldTitle>
                )}
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
                <Field title="Год окончания">
                    <DatePicker
                        size="small"
                        value={item.graduatedAt}
                        onChange={(graduatedAt) =>
                            onChange({ ...item, graduatedAt })
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
