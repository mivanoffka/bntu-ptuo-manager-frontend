import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { Relative } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { RelativeField } from "@/view/employee/fields/other/RelativeField";

export function RelativesList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getRelatives = () => getList<Relative>("relatives");

    const addRelative = () =>
        updateList<Relative>("relatives", {
            id: tempIds.generate(),
            fullName: "",
            birthdate: null,
            relativeType: null,
            comment: null,
        });

    const updateRelative = (relative: Relative) =>
        updateList<Relative>("relatives", relative);

    const removeRelative = (relative: Relative) =>
        removeFromList<Relative>("relatives", relative);

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
