import { FieldContainer } from "@/view/primitives";
import { IValueFieldProps } from "@/view/primitives/fields";
import { PasswordInputField } from "@/view/primitives/fields/derivatives/PasswordInputField";

export function PasswordConfirmationField(
    props: IValueFieldProps<string | null>
) {
    const { value, onChange } = props;

    return (
        <FieldContainer title="Подтвердите пароль">
            <PasswordInputField
                value={value}
                onChange={onChange}
                editModeEnabled
            ></PasswordInputField>
        </FieldContainer>
    );
}
