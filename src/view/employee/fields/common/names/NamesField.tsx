import { IName } from "@/model";
import { HistoryField } from "@/view/primitives/fields";
import { DisplayNameField } from "@/view/employee/fields/common/names/DisplayNameField";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { tempIds } from "@/controller/employee/utils";
import { NameField } from "@/view/employee/fields/common/names/EditNameField";

export function NamesField() {
    const { editModeEnabled } = useEditMode();

    const { getList, updateList, getField, updateField } = useEmployeeEditor();

    function getNewName(): IName {
        return {
            id: tempIds.generate(),
            firstName: "",
            lastName: "",
            middleName: "",
            createdAt: null,
        };
    }

    const names = getList<IName>("names");
    const newName = getField<IName>("newName");

    const updateName = (value: IName | null) => {
        if (value) {
            updateList<IName>("names", value);
        }
    };
    const updateNewName = (value: IName | null) => {
        updateField<IName>("newName", value);
    };

    return (
        <HistoryField
            editModeEnabled={editModeEnabled}
            newItemGetter={getNewName}
            items={names}
            newItem={newName}
            onChangeListItem={updateName}
            onChangeNew={updateNewName}
            FieldType={NameField}
        />
    );
}
