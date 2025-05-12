import { FieldContainer } from "@/components/containers/field-container";
import { SelectField } from "@/components/fields/select";
import { TextField } from "@/components/fields/text";
import { IObjectFieldProps } from "@/components/fields/types";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { IPhoneNumber } from "@/model";
import { Flex } from "antd";

export function PhoneNumberField(props: IObjectFieldProps<IPhoneNumber>) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();
    const { getEnumeration } = useEnumerations();

    const phoneNumberTypes = getEnumeration(EnumerationName.PHONE_NUMBER_TYPES);

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Номер">
                <TextField
                    editModeEnabled={editModeEnabled}
                    value={item?.value}
                    onChange={(value) => onChange({ ...item, value })}
                />
            </FieldContainer>
            <FieldContainer title="Тип">
                <SelectField
                    editModeEnabled={editModeEnabled}
                    selectedIds={[item?.phoneNumberTypeId].filter(
                        (id) => id !== null
                    )}
                    onChange={(phoneNumberTypeIds) =>
                        onChange({
                            ...item,
                            phoneNumberTypeId:
                                phoneNumberTypeIds.length > 0
                                    ? phoneNumberTypeIds[0]
                                    : null,
                        })
                    }
                    enumeration={phoneNumberTypes}
                />
            </FieldContainer>
            <FieldContainer title="Комментарий">
                <TextField
                    editModeEnabled={editModeEnabled}
                    value={item?.comment}
                    onChange={(comment) => onChange({ ...item, comment })}
                />
            </FieldContainer>
        </Flex>
    );
}
