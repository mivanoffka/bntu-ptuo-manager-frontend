import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { IComment } from "@/model";
import {
    IDisplayFieldProps,
    IEditFieldProps,
} from "@/view/primitives/fields/types";
import { useEditMode } from "@/controller/employee";

export function CommentField(props: IEditFieldProps<IComment>) {
    const { value, onChange } = props;
    const { editModeEnabled } = useEditMode();

    function DisplayField(props: IDisplayFieldProps<IComment>) {
        const { value: item } = props;
        const { value } = item;

        return (
            <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
                <Typography.Text>{value}</Typography.Text>
            </Flex>
        );
    }

    function EditField(props: IEditFieldProps<IComment>) {
        const { value: item, onChange } = props;
        const { value } = item;

        return (
            <Flex gap="small" style={{ width: "100%" }}>
                <InputField
                    value={value}
                    onChange={(value) => onChange({ ...item, value })}
                />
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
