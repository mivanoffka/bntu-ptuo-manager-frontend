import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { AcademicDegree } from "@/model";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives";
import { EnumerationName } from "@/controller/enumerations/constants";

export function AcademicDegreeField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { getEnumeration } = useEnumerations();

    const academicDegrees = getEnumeration(EnumerationName.ACADEMIC_DEGREES);

    const academicDegreeId = [
        getField<number | null>("academicDegreeId"),
    ].filter((id) => id !== null);

    const updateAcademicDegree = (values: number[]) =>
        updateField("academicDegreeId", values.length > 0 ? values[0] : null);

    return (
        <FieldContainer title="Ученая степень">
            <SelectField<AcademicDegree>
                editModeEnabled={editModeEnabled}
                selectedIds={academicDegreeId}
                enumeration={academicDegrees}
                onChange={updateAcademicDegree}
            ></SelectField>
        </FieldContainer>
    );
}
