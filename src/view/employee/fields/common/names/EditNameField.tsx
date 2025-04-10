import { FieldContainer } from "@/view/primitives/fields/field/Field";
import { IName, NameUtility } from "@/model";
import { InputField } from "@/view/primitives";
import { Flex } from "antd";

export interface IEditNameFieldProps {
    value: IName;
    onChange: (value: IName) => void;
}

export function EditNameField(props: IEditNameFieldProps) {
    const { value, onChange } = props;

    const { firstName, lastName, middleName } = value ?? {};

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Фамилия">
                <InputField
                    value={lastName}
                    onChange={(newValue) =>
                        onChange(NameUtility.updatedLastName(value, newValue))
                    }
                    placeholder="Фамилия"
                ></InputField>
            </FieldContainer>
            <FieldContainer title="Имя">
                <InputField
                    value={firstName}
                    onChange={(newValue) =>
                        onChange(NameUtility.updatedFirstName(value, newValue))
                    }
                    placeholder="Имя"
                ></InputField>
            </FieldContainer>
            <FieldContainer title="Отчество">
                <InputField
                    value={middleName}
                    onChange={(newValue) =>
                        onChange(NameUtility.updatedMiddleName(value, newValue))
                    }
                    placeholder="Отчество"
                ></InputField>
            </FieldContainer>
        </Flex>
    );
}
