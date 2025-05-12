import { FieldContainer } from "@/components/containers/field-container";
import { TextField } from "@/components/fields/text";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { Flex } from "antd";

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
                <TextField
                    editModeEnabled={editModeEnabled}
                    value={lastName}
                    onChange={updateLastName}
                    placeholder="Фамилия"
                ></TextField>
            </FieldContainer>
            <FieldContainer title="Имя">
                <TextField
                    editModeEnabled={editModeEnabled}
                    value={firstName}
                    onChange={updateFirstName}
                    placeholder="Имя"
                ></TextField>
            </FieldContainer>
            <FieldContainer title="Отчество">
                <TextField
                    editModeEnabled={editModeEnabled}
                    value={middleName}
                    onChange={updateMiddleName}
                    placeholder="Отчество"
                ></TextField>
            </FieldContainer>
        </Flex>
    );
}
