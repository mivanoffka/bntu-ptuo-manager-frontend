import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { AcademicDegree } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { useEmployeeEditor } from "@/controller/employee";

export function AcademicDegreeField() {
    const { getField, updateField } = useEmployeeEditor();
    const { academicDegrees } = useEnumerations();

    const academicDegreeId = getField<number | null>("academicDegreeId");

    const updateAcademicDegree = (value: number | null) =>
        updateField("academicDegreeId", value);

    return (
        <SelectField
            title="Ученая степень"
            selectedId={academicDegreeId}
            enumeration={academicDegrees}
            onChange={updateAcademicDegree}
        ></SelectField>
    );
}
