import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { DateTimeString } from "@/model/date.time.string";
import { DateTimeField } from "@/view/primitives/fields";

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
        <DateTimeField
            value={employeeVersion?.birthdate ?? null}
            onChange={updateBirthdate}
            title="Дата рождения"
            editModeEnabled={editModeEnabled}
        />
    );
}
