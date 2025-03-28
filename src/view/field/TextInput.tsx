import { Input } from "antd";
import "./style/field.css";

export interface ITextInputProps {
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
