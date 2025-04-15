import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives";

export function BirthplaceField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();

    const birthplace = getField<string>("birthplace");

    const updateBirthplace = (value: string | null) =>
        updateField("birthplace", value);

    return (
        <FieldContainer title="Место рождения">
            <InputField
                value={birthplace}
                onChange={updateBirthplace}
                editModeEnabled={editModeEnabled}
            ></InputField>
        </FieldContainer>
    );
}
