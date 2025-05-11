import { IInputFieldProps } from "@/view/primitives/fields/derivatives/InputField";
import { Input } from "antd";

export function PasswordInputField(props: IInputFieldProps) {
    const {
        onChange,
        value,
        placeholder = "Не выбрано",
        editModeEnabled,
    } = props;

    const displayValue = value ?? null;

    return (
        <Input.Password
            readOnly={!editModeEnabled}
            size="small"
            value={displayValue || ""}
            onChange={(e) => {
                onChange(e.target.value);
            }}
            placeholder={placeholder}
            allowClear
        ></Input.Password>
    );
}
