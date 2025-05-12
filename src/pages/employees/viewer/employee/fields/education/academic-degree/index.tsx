import { FieldContainer } from "@/components/containers/field-container";
import { SelectField } from "@/components/fields/select";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { IAcademicDegree } from "@/model";

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
            <SelectField<IAcademicDegree>
                editModeEnabled={editModeEnabled}
                selectedIds={academicDegreeId}
                enumeration={academicDegrees}
                onChange={updateAcademicDegree}
            ></SelectField>
        </FieldContainer>
    );
}
