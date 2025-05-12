import { FieldContainer } from "@/components/containers/field-container";
import { SelectField } from "@/components/fields/select";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";
import { IGender } from "@/model";

export function GenderField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { getEnumeration } = useEnumerations();

    const genders = getEnumeration(EnumerationName.GENDERS);

    const genderId = [getField<number>("genderId")].filter((id) => id !== null);

    const updateGenderId = (values: number[]) =>
        updateField("genderId", values.length > 0 ? values[0] : null);

    return (
        <FieldContainer title="Пол">
            <SelectField<IGender>
                editModeEnabled={editModeEnabled}
                selectedIds={genderId}
                enumeration={genders}
                onChange={updateGenderId}
            ></SelectField>
        </FieldContainer>
    );
}
