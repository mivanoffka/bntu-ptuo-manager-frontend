import { Input } from "antd";
import "./style/field.css";
import { ReactNode } from "react";

export interface ITextInputProps {
    title?: ReactNode;
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string; // Добавляем опциональный плейсхолдер
}

export function TextInput(props: ITextInputProps) {
    const { onChange, value, placeholder = "Не выбрано" } = props;

    const displayValue = value ?? null; // null покажет placeholder

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
