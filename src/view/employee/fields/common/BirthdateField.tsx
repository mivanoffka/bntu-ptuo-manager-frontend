import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { DateTimeString } from "@/model/date.time.string";
import { DateTimeField, FieldContainer } from "@/view/primitives/fields";

export function BirthdateField() {
    const { employeeVersion, updateField } = useEmployeeEditor();
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
                value={employeeVersion?.birthdate ?? null}
                onChange={updateBirthdate}
                editModeEnabled={editModeEnabled}
            />
        </FieldContainer>
    );
}
