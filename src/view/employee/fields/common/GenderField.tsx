import { SelectField } from "@/view/primitives/fields/derivatives/select/SelectField";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { Gender } from "@/model";

export function GenderField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { getEnumeration } = useEnumerations();

    const genders = getEnumeration(EnumerationName.GENDERS);

    const genderId = getField<number>("genderId");

    const updateGenderId = (value: number | null) =>
        updateField("genderId", value);

    return (
        <SelectField<Gender>
            title="Пол"
            editModeEnabled={editModeEnabled}
            selectedId={genderId}
            enumeration={genders}
            onChange={updateGenderId}
        ></SelectField>
    );
}
