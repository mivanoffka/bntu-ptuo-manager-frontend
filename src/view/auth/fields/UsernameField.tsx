import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { FieldContainer } from "@/view/primitives";
import { IValueFieldProps } from "@/view/primitives/fields";

export function UsernameField(props: IValueFieldProps<string | null>) {
    const { value, onChange } = props;

    return (
        <FieldContainer title="Имя пользователя">
            <InputField
                value={value}
                onChange={onChange}
                editModeEnabled
            ></InputField>
        </FieldContainer>
    );
}
