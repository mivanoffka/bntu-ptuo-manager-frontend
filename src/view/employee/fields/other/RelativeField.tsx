import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex } from "antd";
import { IRelative } from "@/model";
import { FieldContainer, SelectField } from "@/view/primitives";

import { useEditMode } from "@/controller/employee";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { DateTimeField, IObjectFieldProps } from "@/view/primitives/fields";

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
                    <InputField
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
                    <InputField
                        editModeEnabled={editModeEnabled}
                        value={comment}
                        onChange={(comment) => onChange({ ...item, comment })}
                    />
                </FieldContainer>
            </Flex>
        </Flex>
    );
}
