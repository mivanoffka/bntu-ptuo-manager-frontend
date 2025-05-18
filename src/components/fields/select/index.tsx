import { IFieldProps } from "@/components/fields/shared";
import { Input, Select, SelectProps } from "antd";

export interface ISelectFieldProps extends SelectProps, IFieldProps {}

export function SelectField(props: ISelectFieldProps) {
    const { isEditable, value, onChange, options } = props;

    const inputValue = options?.find((item) => item.value === value)?.label;

    return isEditable ? (
        <Select
            style={{ textAlign: "left", width: "100%" }}
            {...props}
            allowClear
            value={value}
        />
    ) : (
        <Input value={inputValue} readOnly></Input>
    );
}
