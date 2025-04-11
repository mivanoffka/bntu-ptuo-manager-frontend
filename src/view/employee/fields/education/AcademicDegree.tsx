import { SelectField } from "@/view/primitives/fields/derivatives/select/SelectField";
import { AcademicDegree } from "@/model";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";

export function AcademicDegreeField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { getEnumeration } = useEnumerations();

    const academicDegrees = getEnumeration(EnumerationName.ACADEMIC_DEGREES);

    const academicDegreeId = getField<number | null>("academicDegreeId");

    const updateAcademicDegree = (value: number | null) =>
        updateField("academicDegreeId", value);

    return (
        <SelectField<AcademicDegree>
            editModeEnabled={editModeEnabled}
            title="Ученая степень"
            selectedId={academicDegreeId}
            enumeration={academicDegrees}
            onChange={updateAcademicDegree}
        ></SelectField>
    );
}
