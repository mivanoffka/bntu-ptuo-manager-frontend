import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex, Typography } from "antd";
import { IComment } from "@/model";

export interface ICommentFieldProps {
    value: IComment;
    onChange: (item: IComment) => void;
}

export function CommentField(props: ICommentFieldProps) {
    const { value: item, onChange } = props;

    const displayField = (
        <Flex justify="space-between" gap="small" style={{ width: "100%" }}>
            <Typography.Text>{item.value}</Typography.Text>
        </Flex>
    );

    const editField = (
        <Flex gap="small" style={{ width: "100%" }}>
            <InputField
                value={item.value}
                onChange={(value) => onChange({ ...item, value })}
            ></InputField>
        </Flex>
    );

    return (
        <CombinedField
            displayField={displayField}
            editField={editField}
        ></CombinedField>
    );
}
