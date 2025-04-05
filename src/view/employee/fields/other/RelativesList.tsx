import { Listed } from "@/view/primitives/listed/Listed";
import { IRelative } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { RelativeField } from "@/view/employee/fields/other/RelativeField";
import { useEmployeeEditor } from "@/controller/employee";

export function RelativesList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getRelatives = () => getList<IRelative>("relatives");

    const addRelative = () =>
        updateList<IRelative>("relatives", {
            id: tempIds.generate(),
            fullName: "",
            birthdate: null,
            relativeTypeId: null,
            comment: null,
        });

    const updateRelative = (relative: IRelative) =>
        updateList<IRelative>("relatives", relative);

    const removeRelative = (relative: IRelative) =>
        removeFromList<IRelative>("relatives", relative);

    return (
        <Listed
            items={getRelatives()}
            FieldType={RelativeField}
            get={getRelatives}
            add={addRelative}
            update={updateRelative}
            remove={removeRelative}
            title="Родственники"
        ></Listed>
    );
}
