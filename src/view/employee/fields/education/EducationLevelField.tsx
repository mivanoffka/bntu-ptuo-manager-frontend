import { SelectField } from "@/view/primitives/fields/derivatives/select/SelectField";
import { EducationLevel } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";

export function EducationLevelField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { educationLevels } = useEnumerations();

    const educationLevelId = getField<number | null>("educationLevelId");

    const updateEducationLevel = (value: number | null) =>
        updateField("educationLevelId", value);

    return (
        <SelectField<EducationLevel>
            editModeEnabled={editModeEnabled}
            title="Образование"
            selectedId={educationLevelId}
            enumeration={educationLevels}
            onChange={updateEducationLevel}
        ></SelectField>
    );
}
