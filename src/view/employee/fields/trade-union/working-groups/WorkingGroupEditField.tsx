import { IWorkingGroupRecord } from "@/model";
import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { SelectField } from "@/view/primitives";

export interface IWorkingGroupEditFieldProps {
    value: IWorkingGroupRecord;
    onChange: (value: IWorkingGroupRecord) => void;
}

export function WorkingGroupEditField(props: IWorkingGroupEditFieldProps) {
    const { value, onChange } = props;
    const { getEnumeration } = useEnumerations();
    const workingGroups = getEnumeration(EnumerationName.WORKING_GROUPS);

    return (
        <SelectField.Edit
            selectedId={value.workingGroupOptionId}
            onChange={(workingGroupOptionId) =>
                onChange({ ...value, workingGroupOptionId })
            }
            enumeration={workingGroups}
        ></SelectField.Edit>
    );
}
