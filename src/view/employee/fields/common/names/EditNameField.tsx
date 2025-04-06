import { Field } from "@/view/primitives/fields/field/Field";
import { IName } from "@/model";
import { InputField } from "@/view/primitives";
import { Flex } from "antd";

export interface IEditNameFieldProps {
    value: IName;
    onChange: (value: IName) => void;
}

export function EditNameField(props: IEditNameFieldProps) {
    const { value, onChange } = props;

    const { firstName, lastName, middleName } = value ?? {};

    function updateNamePart(fieldName: string, newValue: string) {
        const newName = { ...value, [fieldName]: newValue };

        onChange(newName);
    }

    function updateFirstName(value: string) {
        updateNamePart("firstName", value);
    }

    function updateLastName(value: string) {
        updateNamePart("lastName", value);
    }

    function updateMiddleName(value: string) {
        updateNamePart("middleName", value);
    }

    return (
        <Flex gap="small">
            <Field title="Фамилия">
                <InputField
                    value={lastName}
                    onChange={updateLastName}
                    placeholder="Фамилия"
                ></InputField>
            </Field>
            <Field title="Имя">
                <InputField
                    value={firstName}
                    onChange={updateFirstName}
                    placeholder="Имя"
                ></InputField>
            </Field>
            <Field title="Отчество">
                <InputField
                    value={middleName}
                    onChange={updateMiddleName}
                    placeholder="Отчество"
                ></InputField>
            </Field>
        </Flex>
    );
}
