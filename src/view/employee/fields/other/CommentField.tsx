import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex } from "antd";
import { IComment } from "@/model";

import { useEditMode } from "@/controller/employee";
import { IObjectFieldProps } from "@/view/primitives/fields";

export function CommentField(props: IObjectFieldProps<IComment>) {
    const { value: item, onChange } = props;
    const { editModeEnabled } = useEditMode();

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <InputField
                editModeEnabled={editModeEnabled}
                value={item.value}
                onChange={(value) => onChange({ ...item, value })}
            />
        </Flex>
    );
}
