import { TextField } from "@/components/fields/text";
import { IObjectFieldProps } from "@/components/fields/types";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { IComment } from "@/model";
import { Flex } from "antd";

export function CommentField(props: IObjectFieldProps<IComment>) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <TextField
                editModeEnabled={editModeEnabled}
                value={item.value}
                onChange={(value) => onChange({ ...item, value })}
            />
        </Flex>
    );
}
