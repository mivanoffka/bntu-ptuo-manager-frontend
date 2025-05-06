import { Listed } from "@/view/primitives/listed/Listed";
import { IRelative } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { RelativeField } from "@/view/employee/fields/other/RelativeField";
import { useEditMode, useEmployeeEditor } from "@/controller/employee";

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
