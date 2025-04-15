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
    const selectedId = getField<Number>("workingGroupId") as number;
    const onChange = (value: number | null) =>
        updateField("workingGroupId", value);

    const { editModeEnabled } = useEditMode();

    return (
        <FieldContainer title="Профгруппа">
            <SelectField
                editModeEnabled={editModeEnabled}
                selectedId={selectedId}
                onChange={onChange}
                enumeration={workingGroups}
            ></SelectField>
        </FieldContainer>
    );
}
