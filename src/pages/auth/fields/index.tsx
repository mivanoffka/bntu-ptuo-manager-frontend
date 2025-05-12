import { FieldContainer } from "@/components/containers/field-container";
import { TextField } from "@/components/fields/text";
import { IValueFieldProps } from "@/components/fields/types";
import { PasswordTextField } from "@/components/fields/password";

export function UsernameField(props: IValueFieldProps<string | null>) {
    const { value, onChange } = props;

    return (
        <FieldContainer title="Имя пользователя">
            <TextField
                value={value}
                onChange={onChange}
                editModeEnabled
            ></TextField>
        </FieldContainer>
    );
}

export function PasswordField(props: IValueFieldProps<string | null>) {
    const { value, onChange } = props;

    return (
        <FieldContainer title="Пароль">
            <PasswordTextField
                value={value}
                onChange={onChange}
                editModeEnabled
            ></PasswordTextField>
        </FieldContainer>
    );
}

export function PasswordConfirmationField(
    props: IValueFieldProps<string | null>
) {
    const { value, onChange } = props;

    return (
        <FieldContainer title="Подтвердите пароль">
            <PasswordTextField
                value={value}
                onChange={onChange}
                editModeEnabled
            ></PasswordTextField>
        </FieldContainer>
    );
}
