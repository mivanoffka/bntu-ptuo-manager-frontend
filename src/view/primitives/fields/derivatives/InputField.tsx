import { Input } from "antd";
import { ReactNode } from "react";

export interface IInputFieldProps {
    title?: ReactNode;
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    editModeEnabled: boolean;
}

export function InputField(props: IInputFieldProps) {
    const {
        onChange,
        value,
        placeholder = "Не выбрано",
        editModeEnabled,
    } = props;

    const displayValue = value ?? null;

    return (
        <Input
            readOnly={!editModeEnabled}
            size="small"
            value={displayValue || ""}
            onChange={(e) => {
                onChange(e.target.value);
            }}
            placeholder={placeholder}
            allowClear
        ></Input>
    );
}
