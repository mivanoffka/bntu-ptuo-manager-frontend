import { FieldContainer } from "@/components/containers/field-container";
import { DateTimeField } from "@/components/fields/datetime";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { DateTimeString } from "@/model";

export function BirthdateField() {
    const { displayedEmployeeVersion, updateField } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const updateBirthdate = (value: string | null) => {
        updateField<DateTimeString | null>(
            "birthdate",
            value as DateTimeString
        );
    };

    return (
        <FieldContainer title="Дата рождения">
            <DateTimeField
                value={displayedEmployeeVersion?.birthdate ?? null}
                onChange={updateBirthdate}
                editModeEnabled={editModeEnabled}
            />
        </FieldContainer>
    );
}
