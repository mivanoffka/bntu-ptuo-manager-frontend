import { IName } from "@/model";
import { HistoryField, HistoryListField } from "@/view/primitives/fields";
import { DisplayNameField } from "@/view/employee/fields/common/names/DisplayNameField";
import { EditNameField } from "@/view/employee/fields/common/names/EditNameField";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";
import { tempIds } from "@/controller/employee/utils";

export function NamesField() {
    const { editModeEnabled } = useEditMode();

    function getNewName() {
        return {
            id: tempIds.generate(),
            firstName: "",
            lastName: "",
            middleName: "",
        } as IName;
    }

    const { getList, updateList, removeFromList, getField, updateField } =
        useEmployeeEditor();

    const names = getList<IName>("names"); // Получаем значения сразу

    const newName = getField<IName>("newName"); // Получаем значения сразу

    const updateName = (value: IName) => updateList<IName>("names", value);

    const updateNewName = (value: IName | null) =>
        updateField<IName>("newName", value);

    const removeName = (value: IName) => removeFromList<IName>("names", value);

    const title = editModeEnabled ? undefined : "Полное имя";

    return (
        // <HistoryListField
        //     title={title}
        //     newItemGetter={getNewName}
        //     DisplayFieldType={DisplayNameField}
        //     EditFieldType={EditNameField}
        //     values={names}
        //     onChange={updateName}
        //     onDelete={removeName}
        // />
        <HistoryField
            title={title}
            newItemGetter={getNewName}
            items={names}
            newItem={newName}
            onChangeList={updateName}
            onChangeNew={updateNewName}
            DisplayFieldType={DisplayNameField}
            EditFieldType={EditNameField}
        />
    );
}
