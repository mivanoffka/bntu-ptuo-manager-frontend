import { FieldContainer } from "@/components/containers/field-container";
import { TextField } from "@/components/fields/text";
import { IObjectFieldProps } from "@/components/fields/types";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { IEmail } from "@/model";
import { Flex } from "antd";

export function EmailField(props: IObjectFieldProps<IEmail>) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Адрес">
                <TextField
                    editModeEnabled={editModeEnabled}
                    value={item.value}
                    onChange={(value) => onChange({ ...item, value })}
                />
            </FieldContainer>
            <FieldContainer title="Комментарий">
                <TextField
                    editModeEnabled={editModeEnabled}
                    value={item.comment}
                    onChange={(comment) => onChange({ ...item, comment })}
                />
            </FieldContainer>
        </Flex>
    );
}
