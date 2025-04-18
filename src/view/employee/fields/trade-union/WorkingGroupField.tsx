import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { FieldContainer, SelectField } from "@/view/primitives";

export function WorkingGroupField() {
    const { getEnumeration } = useEnumerations();
    const workingGroups = getEnumeration(EnumerationName.WORKING_GROUPS);

    const { getField, updateField } = useEmployeeEditor();
    const selectedId = [getField<number>("workingGroupId")].filter(
        (id) => id !== null
    );
    const onChange = (values: number[]) =>
        updateField("workingGroupId", values.length > 0 ? values[0] : null);

    const { editModeEnabled } = useEditMode();

    return (
        <FieldContainer title="Профгруппа">
            <SelectField
                editModeEnabled={editModeEnabled}
                selectedIds={selectedId}
                onChange={onChange}
                enumeration={workingGroups}
            ></SelectField>
        </FieldContainer>
    );
}
