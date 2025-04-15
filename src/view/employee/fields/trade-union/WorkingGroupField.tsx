import { IWorkingGroupRecord } from "@/model";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { SelectField } from "@/view/primitives";
import { IObjectFieldProps } from "@/view/primitives/fields";

export function WorkingGroupField(
    props: IObjectFieldProps<IWorkingGroupRecord>
) {
    const { value, onChange, editModeEnabled } = props;
    const { getEnumeration } = useEnumerations();
    const workingGroups = getEnumeration(EnumerationName.WORKING_GROUPS);

    return (
        <SelectField
            editModeEnabled={editModeEnabled}
            selectedId={value.workingGroupOptionId}
            onChange={(workingGroupOptionId) =>
                onChange({ ...value, workingGroupOptionId })
            }
            enumeration={workingGroups}
        ></SelectField>
    );
}
