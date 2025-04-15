import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { EducationLevel } from "@/model";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives";

export function EducationLevelField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { getEnumeration } = useEnumerations();

    const educationLevels = getEnumeration(EnumerationName.EDUCATION_LEVELS);

    const educationLevelId = getField<number | null>("educationLevelId");

    const updateEducationLevel = (value: number | null) =>
        updateField("educationLevelId", value);

    return (
        <FieldContainer title="Образование">
            <SelectField<EducationLevel>
                editModeEnabled={editModeEnabled}
                selectedId={educationLevelId}
                enumeration={educationLevels}
                onChange={updateEducationLevel}
            ></SelectField>
        </FieldContainer>
    );
}
