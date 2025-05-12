import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { tempIds } from "@/contexts/employees/utils";
import { IRelative } from "@/model";
import { RelativeField } from "@/pages/employees/viewer/employee/fields/other/relatives/list-item";

export function RelativesList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const getRelatives = () => getList<IRelative>("relatives");

    const getNewRelative = () => ({
        id: tempIds.generate(),
        fullName: "",
        birthdate: null,
        relativeTypeId: null,
        comment: null,
    });

    const updateRelative = (item: IRelative | null) => {
        if (item) {
            updateList<IRelative>("relatives", item);
        }
    };

    const removeRelative = (item: IRelative) =>
        removeFromList<IRelative>("relatives", item);

    return (
        <Listed<IRelative>
            editModeEnabled={editModeEnabled}
            items={getRelatives()}
            FieldType={RelativeField}
            newItemGetter={getNewRelative}
            onChange={updateRelative}
            onDelete={removeRelative}
            title="Родственники"
        ></Listed>
    );
}
