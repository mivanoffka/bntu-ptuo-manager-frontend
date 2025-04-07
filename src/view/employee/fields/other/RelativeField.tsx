import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { DatePicker, Flex, Typography } from "antd";
import { IRelative } from "@/model";
import { Field, FieldTitle, LabelField, SelectField } from "@/view/primitives";
import dayjs from "dayjs";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";

export interface IRelativeFieldProps {
    value: IRelative;
    onChange: (item: IRelative) => void;
}

export function RelativeField(props: IRelativeFieldProps) {
    const { value: item, onChange } = props;
    const { relativeTypes } = useEnumerations();

    const displayField = (
        <Flex vertical gap="middle" style={{ width: "100%" }}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <LabelField>{item.fullName}</LabelField>
                <FieldTitle>
                    род. {dayjs(item.birthdate).format("DD.MM.YYYY")},{" "}
                </FieldTitle>
                <SelectField.Display
                    enumeration={relativeTypes}
                    selectedId={item.relativeTypeId}
                ></SelectField.Display>
            </Flex>
            {item.comment && (
                <Flex
                    justify="space-between"
                    gap="small"
                    style={{ width: "100%" }}
                >
                    <FieldTitle>{item.comment}</FieldTitle>
                </Flex>
            )}
        </Flex>
    );

    const editField = (
        <Flex vertical gap="middle" style={{ width: "100%" }}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Field title="ФИО">
                    <InputField
                        value={item.fullName}
                        onChange={(value) =>
                            onChange({ ...item, fullName: value })
                        }
                    ></InputField>
                </Field>
            </Flex>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Field title="Дата рождения">
                    <DatePicker
                        size="small"
                        value={item.birthdate}
                        onChange={(value) =>
                            onChange({ ...item, birthdate: value })
                        }
                    />
                </Field>
                <Field title="Родство">
                    <SelectField.Edit
                        onChange={(value) =>
                            onChange({ ...item, relativeTypeId: value })
                        }
                        selectedId={item.relativeTypeId}
                        enumeration={relativeTypes}
                    />
                </Field>
            </Flex>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Field title="Комментарий">
                    <InputField
                        value={item.comment}
                        onChange={(value) =>
                            onChange({ ...item, comment: value })
                        }
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
