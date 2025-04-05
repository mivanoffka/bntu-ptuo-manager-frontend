import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { EducationLevel } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { useEmployeeEditor } from "@/controller/employee";

export function EducationLevelField() {
    const { getField, updateField } = useEmployeeEditor();
    const { educationLevels } = useEnumerations();

    const educationLevelId = getField<number | null>("educationLevelId");

    const updateEducationLevel = (value: number | null) =>
        updateField("educationLevelId", value);

    return (
        <SelectField
            title="Образование"
            selectedId={educationLevelId}
            enumeration={educationLevels}
            onChange={updateEducationLevel}
        ></SelectField>
    );
}
