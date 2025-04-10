import { IPhoneNumber } from "@/model";
import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { FieldContainer } from "@/view/primitives/fields/field/Field";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { SecondaryLabel, SelectField } from "@/view/primitives";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { useEditMode } from "@/controller/employee";

export function PhoneNumberField(props: IEditFieldProps<IPhoneNumber>) {
    const { value, onChange } = props;
    const { editModeEnabled } = useEditMode();
    const { phoneNumberTypes } = useEnumerations();

    function DisplayField(props: IDisplayFieldProps<IPhoneNumber>) {
        const { value: item } = props;
        const { value, comment, phoneNumberTypeId } = item;

        return (
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Typography.Text>{value}</Typography.Text>
                <div>
                    <SecondaryLabel>
                        <SelectField.Display
                            selectedId={phoneNumberTypeId}
                            enumeration={phoneNumberTypes}
                        />
                    </SecondaryLabel>
                    {comment && (
                        <Typography.Text type="secondary">
                            {comment}
                        </Typography.Text>
                    )}
                </div>
            </Flex>
        );
    }

    function EditField(props: IEditFieldProps<IPhoneNumber>) {
        const { value: item, onChange } = props;
        const { value, comment, phoneNumberTypeId } = item;

        return (
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Номер">
                    <InputField
                        value={value}
                        onChange={(value) => onChange({ ...item, value })}
                    />
                </FieldContainer>
                <FieldContainer title="Тип">
                    <SelectField.Edit
                        selectedId={phoneNumberTypeId}
                        onChange={(phoneNumberTypeId) =>
                            onChange({ ...item, phoneNumberTypeId })
                        }
                        enumeration={phoneNumberTypes}
                    />
                </FieldContainer>
                <FieldContainer title="Комментарий">
                    <InputField
                        value={comment}
                        onChange={(comment) => onChange({ ...item, comment })}
                    />
                </FieldContainer>
            </Flex>
        );
    }

    return (
        <CombinedFieldContainer
            editModeEnabled={editModeEnabled}
            value={value}
            onChange={onChange}
            DisplayFieldType={DisplayField}
            EditFieldType={EditField}
        />
    );
}
