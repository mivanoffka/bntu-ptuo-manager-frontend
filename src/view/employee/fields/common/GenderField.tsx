import { SelectField } from "@/view/primitives/fields/derivatives/select/SelectField";
import { useEnumerations } from "@/controller/enumerations/EnumerationsContext";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { Gender } from "@/model";
import { FieldContainer } from "@/view/primitives";

export function GenderField() {
    const { editModeEnabled } = useEditMode();
    const { getField, updateField } = useEmployeeEditor();
    const { genders } = useEnumerations();

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
