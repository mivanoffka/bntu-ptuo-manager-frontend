import { IAddress } from "@/model";
import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { FieldContainer } from "@/view/primitives/fields/field/Field";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { useEditMode } from "@/controller/employee";

export function AddressField(props: IEditFieldProps<IAddress>) {
    const { value, onChange } = props;
    const { editModeEnabled } = useEditMode();

    function DisplayField(props: IDisplayFieldProps<IAddress>) {
        const { value: item } = props;
        const { value, comment } = item;

        return (
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Typography.Text>{value}</Typography.Text>
                <Typography.Text type="secondary">{comment}</Typography.Text>
            </Flex>
        );
    }

    function EditField(props: IEditFieldProps<IAddress>) {
        const { value: item, onChange } = props;
        const { value, comment } = item;

        return (
            <Flex gap="small" style={{ width: "100%" }}>
                <FieldContainer title="Адрес">
                    <InputField
                        value={value}
                        onChange={(value) => onChange({ ...item, value })}
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
