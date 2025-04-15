import { InputField } from "@/view/primitives";
import { Flex } from "antd";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives/fields";

export function FullNameField() {
    const { editModeEnabled } = useEditMode();

    const { getField, updateField } = useEmployeeEditor();

    const firstName = getField<string>("firstName");
    const lastName = getField<string>("lastName");
    const middleName = getField<string>("middleName");

    const updateFirstName = (value: string | null) =>
        updateField("firstName", value);
    const updateLastName = (value: string | null) =>
        updateField("lastName", value);
    const updateMiddleName = (value: string | null) =>
        updateField("middleName", value);

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <FieldContainer title="Фамилия">
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={lastName}
                    onChange={updateLastName}
                    placeholder="Фамилия"
                ></InputField>
            </FieldContainer>
            <FieldContainer title="Имя">
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={firstName}
                    onChange={updateFirstName}
                    placeholder="Имя"
                ></InputField>
            </FieldContainer>
            <FieldContainer title="Отчество">
                <InputField
                    editModeEnabled={editModeEnabled}
                    value={middleName}
                    onChange={updateMiddleName}
                    placeholder="Отчество"
                ></InputField>
            </FieldContainer>
        </Flex>
    );
}
