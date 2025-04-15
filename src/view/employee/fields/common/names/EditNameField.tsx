import { IName, NameUtility } from "@/model";
import { InputField } from "@/view/primitives";
import { Flex } from "antd";
import { useEditMode } from "@/controller/employee";
import { FieldContainer, IObjectFieldProps } from "@/view/primitives/fields";

export function NameField(props: IObjectFieldProps<IName>) {
    const { value, onChange } = props;

    const { editModeEnabled } = useEditMode();
    const { firstName, lastName, middleName } = value ?? {};

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Фамилия">
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={lastName}
                    onChange={(newValue) =>
                        onChange(NameUtility.updatedLastName(value, newValue))
                    }
                    placeholder="Фамилия"
                ></InputField>
            </FieldContainer>
            <FieldContainer title="Имя">
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={firstName}
                    onChange={(newValue) =>
                        onChange(NameUtility.updatedFirstName(value, newValue))
                    }
                    placeholder="Имя"
                ></InputField>
            </FieldContainer>
            <FieldContainer title="Отчество">
                <InputField
                    editModeEnabled={editModeEnabled}
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
