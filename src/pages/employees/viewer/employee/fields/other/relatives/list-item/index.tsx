import { FieldContainer } from "@/components/containers/field-container";
import { DateTimeField } from "@/components/fields/datetime";
import { SelectField } from "@/components/fields/select";
import { TextField } from "@/components/fields/text";
import { IObjectFieldProps } from "@/components/fields/types";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { IRelative } from "@/model";
import { Flex } from "antd";

export function RelativeField(props: IObjectFieldProps<IRelative>) {
    const { editModeEnabled } = useEditMode();
    const { getEnumeration } = useEnumerations();

    const { value: item, onChange } = props;
    const { fullName, birthdate, relativeTypeId, comment } = item;

    const relativeTypes = getEnumeration(EnumerationName.RELATIVE_TYPES);

    return (
        <Flex vertical gap="small" style={{ width: "100%" }}>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <FieldContainer title="ФИО">
                    <TextField
                        editModeEnabled={editModeEnabled}
                        value={fullName}
                        onChange={(fullName) =>
                            onChange({
                                ...item,
                                fullName: fullName ? fullName : "",
                            })
                        }
                    />
                </FieldContainer>
            </Flex>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Дата рождения">
                    <DateTimeField
                        editModeEnabled={editModeEnabled}
                        value={birthdate}
                        onChange={(birthdate) =>
                            onChange({ ...item, birthdate })
                        }
                    ></DateTimeField>
                </FieldContainer>
                <FieldContainer title="Родство">
                    <SelectField
                        editModeEnabled={editModeEnabled}
                        onChange={(values) =>
                            onChange({
                                ...item,
                                relativeTypeId:
                                    values.length > 0 ? values[0] : null,
                            })
                        }
                        selectedIds={[relativeTypeId].filter(
                            (id) => id !== null
                        )}
                        enumeration={relativeTypes}
                    />
                </FieldContainer>
            </Flex>
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Комментарий">
                    <TextField
                        editModeEnabled={editModeEnabled}
                        value={comment}
                        onChange={(comment) => onChange({ ...item, comment })}
                    />
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
