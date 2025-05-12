import { FieldContainer } from "@/components/containers/field-container";
import { SelectField } from "@/components/fields/select";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { IEducationLevel } from "@/model";

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
            <SelectField<IEducationLevel>
                editModeEnabled={editModeEnabled}
                selectedIds={educationLevelId}
                enumeration={educationLevels}
                onChange={updateEducationLevel}
            ></SelectField>
        </FieldContainer>
    );
}
