import { IName } from "@/model";
import { HistoryField } from "@/view/primitives/fields";
import { DisplayNameField } from "@/view/employee/fields/common/names/DisplayNameField";
import { EditNameField } from "@/view/employee/fields/common/names/EditNameField";
import { useEditMode } from "@/controller/employee";

export function NamesField() {
    const { editModeEnabled } = useEditMode();

    function getNewName() {
        return { firstName: "", lastName: "", middleName: "" } as IName;
    }

    const title = editModeEnabled ? undefined : "Полное имя";

    return (
        <HistoryField
            title={title}
            itemsFieldName="names"
            newItemFieldName="newName"
            newItemGetter={getNewName}
            DisplayFieldType={DisplayNameField}
            EditFieldType={EditNameField}
        ></HistoryField>
    );
}
