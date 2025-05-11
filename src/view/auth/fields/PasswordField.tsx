import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { FieldContainer } from "@/view/primitives";
import { IValueFieldProps } from "@/view/primitives/fields";
import { PasswordInputField } from "@/view/primitives/fields/derivatives/PasswordInputField";

export function PasswordField(props: IValueFieldProps<string | null>) {
    const { value, onChange } = props;

    return (
        <FieldContainer title="Пароль">
            <PasswordInputField
                value={value}
                onChange={onChange}
                editModeEnabled
            ></PasswordInputField>
        </FieldContainer>
    );
}
