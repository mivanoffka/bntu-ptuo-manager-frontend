import { Input } from "antd";
import { ReactNode } from "react";

export interface IInputFieldProps {
    title?: ReactNode;
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
}

export function InputField(props: IInputFieldProps) {
    const { onChange, value, placeholder = "Не выбрано" } = props;

    const displayValue = value ?? null;

    return (
        <Input
            size="small"
            value={displayValue}
            onChange={(e) => {
                onChange(e.target.value);
            }}
            placeholder={placeholder}
            allowClear
        ></Input>
    );
}
