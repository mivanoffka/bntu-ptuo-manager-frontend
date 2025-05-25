import { IFieldProps } from "@/components/fields/shared";
import { Input, InputProps } from "antd";

export interface ITextFieldProps extends InputProps, IFieldProps {}

export function TextField(props: ITextFieldProps) {
    const { isEditable } = props;

    return (
        <Input
            {...props}
            readOnly={!isEditable}
            allowClear
            placeholder="Не указано"
        ></Input>
    );
}
