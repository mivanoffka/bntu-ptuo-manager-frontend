import { HistoryField } from "@/view/primitives/fields";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { tempIds } from "@/controller/employee/utils";
import { IWorkingGroupRecord } from "@/model";
import { WorkingGroupDisplayField } from "@/view/employee/fields/trade-union/working-groups/WorkingGroupDisplayField";
import { WorkingGroupEditField } from "@/view/employee/fields/trade-union/working-groups/WorkingGroupEditField";

export function WorkingGroupHistory() {
    const { editModeEnabled } = useEditMode();

    const { getList, updateList, getField, updateField } = useEmployeeEditor();

    function getNewWorkingGroupRecord(): IWorkingGroupRecord {
        return {
            id: tempIds.generate(),
            createdAt: null,
            workingGroupOptionId: null,
            authenticLabel: null,
        };
    }

    const tradeUnionDepartmentRecords = getList<IWorkingGroupRecord>(
        "workingGroupRecords"
    );
    const newWorkingGroupRecord = getField<IWorkingGroupRecord>(
        "newWorkingGroupRecord"
    );

    const updateWorkingGroupRecord = (value: IWorkingGroupRecord | null) => {
        if (value) {
            updateList<IWorkingGroupRecord>("workingGroupRecords", value);
        }
    };

    const updateNewWorkingGroupRecord = (value: IWorkingGroupRecord | null) => {
        updateField<IWorkingGroupRecord>("newWorkingGroupRecord", value);
    };

    const title = "Профгруппа";

    return (
        <HistoryField
            editModeEnabled={editModeEnabled}
            title={title}
            newItemGetter={getNewWorkingGroupRecord}
            items={tradeUnionDepartmentRecords}
            newItem={newWorkingGroupRecord}
            onChangeListItem={updateWorkingGroupRecord}
            onChangeNew={updateNewWorkingGroupRecord}
            DisplayFieldType={WorkingGroupDisplayField}
            EditFieldType={WorkingGroupEditField}
        />
    );
}
