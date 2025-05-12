import { Input } from "antd";
import { ReactNode } from "react";

export interface ITextFieldProps {
    title?: ReactNode;
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    editModeEnabled: boolean;
}

export function TextField(props: ITextFieldProps) {
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
