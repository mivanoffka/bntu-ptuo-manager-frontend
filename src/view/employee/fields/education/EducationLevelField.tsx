import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { EducationLevel } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives";
import { EnumerationName } from "@/controller/enumerations/constants";

export function EducationLevelField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { getEnumeration } = useEnumerations();

    const educationLevels = getEnumeration(EnumerationName.EDUCATION_LEVELS);

    const educationLevelId = [
        getField<number | null>("educationLevelId"),
    ].filter((id) => id !== null);

    const updateEducationLevel = (values: number[]) =>
        updateField("educationLevelId", values.length > 0 ? values[0] : null);

    return (
        <FieldContainer title="Образование">
            <SelectField<EducationLevel>
                editModeEnabled={editModeEnabled}
                selectedIds={educationLevelId}
                enumeration={educationLevels}
                onChange={updateEducationLevel}
            ></SelectField>
        </FieldContainer>
    );
}
