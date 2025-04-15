import { IEmail } from "@/model";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex } from "antd";
import { useEditMode } from "@/controller/employee";
import { FieldContainer, IObjectFieldProps } from "@/view/primitives/fields";

export function EmailField(props: IObjectFieldProps<IEmail>) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Адрес">
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={item.value}
                    onChange={(value) => onChange({ ...item, value })}
                />
            </FieldContainer>
            <FieldContainer title="Комментарий">
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={item.comment}
                    onChange={(comment) => onChange({ ...item, comment })}
                />
            </FieldContainer>
        </Flex>
    );
}
