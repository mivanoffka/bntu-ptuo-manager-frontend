import {
    EnumerationName,
    useEnumerations,
} from "@/controller/enumerations/EnumerationsContext";
import { IWorkingGroupRecord } from "@/model";
import { SelectField } from "@/view/primitives";

export interface IWorkingGroupDisplayFieldProps {
    value: IWorkingGroupRecord;
}

export function WorkingGroupDisplayField(
    props: IWorkingGroupDisplayFieldProps
) {
    const { value } = props;
    const { getEnumeration } = useEnumerations();
    const workingGroups = getEnumeration(EnumerationName.WORKING_GROUPS);

    return (
        <SelectField.Display
            selectedId={value.workingGroupOptionId}
            enumeration={workingGroups}
        ></SelectField.Display>
    );
}
