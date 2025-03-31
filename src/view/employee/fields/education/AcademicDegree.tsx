import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { AcademicDegree } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";

export function AcademicDegreeField() {
    const { getField, updateField } = useEmployeeEditor();
    const { academicDegrees } = useEnumerations();

    const academicDegree = getField<AcademicDegree>("academicDegree");

    const updateAcademicDegree = (value: AcademicDegree) =>
        updateField("academicDegree", value);

    return (
        <SelectField
            title="Ученая степень"
            value={academicDegree}
            enumeration={academicDegrees}
            onChange={updateAcademicDegree}
        ></SelectField>
    );
}
