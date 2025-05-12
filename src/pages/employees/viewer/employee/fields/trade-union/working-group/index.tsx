import { FieldContainer } from "@/components/containers/field-container";
import { SelectField } from "@/components/fields/select";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { useEnumerations } from "@/contexts/enumerations";
import { EnumerationName } from "@/contexts/enumerations/constants";

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
