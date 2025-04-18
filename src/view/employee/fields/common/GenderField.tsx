import { SelectField } from "@/view/primitives/fields/derivatives/SelectField";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { Gender } from "@/model";
import { FieldContainer } from "@/view/primitives";

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
            <SelectField<Gender>
                editModeEnabled={editModeEnabled}
                selectedIds={genderId}
                enumeration={genders}
                onChange={updateGenderId}
            ></SelectField>
        </FieldContainer>
    );
}
