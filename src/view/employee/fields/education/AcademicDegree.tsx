import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import { AcademicDegree } from "@/model";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { FieldContainer } from "@/view/primitives";

export function AcademicDegreeField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { getEnumeration } = useEnumerations();

    const academicDegrees = getEnumeration(EnumerationName.ACADEMIC_DEGREES);

    const academicDegreeId = getField<number | null>("academicDegreeId");

    const updateAcademicDegree = (value: number | null) =>
        updateField("academicDegreeId", value);

    return (
        <FieldContainer title="Ученая степень">
            <SelectField<AcademicDegree>
                editModeEnabled={editModeEnabled}
                selectedId={academicDegreeId}
                enumeration={academicDegrees}
                onChange={updateAcademicDegree}
            ></SelectField>
        </FieldContainer>
    );
}
