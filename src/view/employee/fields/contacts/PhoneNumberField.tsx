import { IPhoneNumber } from "@/model";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import {
    SelectField,
    FieldContainer,
    IObjectFieldProps,
} from "@/view/primitives/fields";
import { Flex } from "antd";
import { useEditMode } from "@/controller/employee";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";

export function PhoneNumberField(props: IObjectFieldProps<IPhoneNumber>) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();
    const { getEnumeration } = useEnumerations();

    const phoneNumberTypes = getEnumeration(EnumerationName.PHONE_NUMBER_TYPES);

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Номер">
                <InputField
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
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={item?.comment}
                    onChange={(comment) => onChange({ ...item, comment })}
                />
            </FieldContainer>
        </Flex>
    );
}
