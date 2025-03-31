import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { EducationLevel } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";

export function EducationLevelField() {
    const { getField, updateField } = useEmployeeEditor();
    const { educationLevels } = useEnumerations();

    const educationLevel = getField<EducationLevel>("educationLevel");

    const updateEducationLevel = (value: EducationLevel) =>
        updateField("educationLevel", value);

    return (
        <SelectField
            title="Образование"
            value={educationLevel}
            enumeration={educationLevels}
            onChange={updateEducationLevel}
        ></SelectField>
    );
}
