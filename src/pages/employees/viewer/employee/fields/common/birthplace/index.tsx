import { FieldContainer } from "@/components/containers/field-container";
import { TextField } from "@/components/fields/text";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";

export function BirthplaceField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();

    const birthplace = getField<string>("birthplace");

    const updateBirthplace = (value: string | null) =>
        updateField("birthplace", value);

    return (
        <FieldContainer title="Место рождения">
            <TextField
                value={birthplace}
                onChange={updateBirthplace}
                editModeEnabled={editModeEnabled}
            ></TextField>
        </FieldContainer>
    );
}
