import { CombinedFieldContainer } from "@/view/primitives/fields/field/CombinedField";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";

export function BirthplaceField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();

    const birthplace = getField<string>("birthplace");

    const updateBirthplace = (value: string | null) =>
        updateField("birthplace", value);

    return (
        <CombinedFieldContainer
            value={birthplace}
            onChange={updateBirthplace}
            editModeEnabled={editModeEnabled}
            title="Место рождения"
            DisplayFieldType={LabelField}
            EditFieldType={InputField}
        ></CombinedFieldContainer>
    );
}
