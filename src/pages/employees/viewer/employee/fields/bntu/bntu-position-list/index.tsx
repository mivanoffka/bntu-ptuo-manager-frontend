import { IBntuPosition } from "@/model";
import { tempIds } from "@/contexts/employees/utils";
import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { BntuPositionField } from "@/pages/employees/viewer/employee/fields/bntu/bntu-position-list/list-item";

export function BntuPositionsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const getBntuPositions = () => getList<IBntuPosition>("bntuPositions");

    const getNewBntuPosition = () => {
        return {
            id: tempIds.generate(),
            bntuDepartmentPath: null,
            bntuDepartmentAuthenticLabel: null,
            label: null,
            hiredAt: null,
            isDischarged: false,
            dischargedAt: null,
            isDischargedVoluntarily: null,
            dischargementComment: null,
        };
    };

    const updateBntuPosition = (item: IBntuPosition | null) => {
        if (item) {
            updateList<IBntuPosition>("bntuPositions", item);
        }
    };

    const removeBntuPosition = (item: IBntuPosition) =>
        removeFromList<IBntuPosition>("bntuPositions", item);

    return (
        <Listed<IBntuPosition>
            editModeEnabled={editModeEnabled}
            items={getBntuPositions()}
            FieldType={BntuPositionField}
            newItemGetter={getNewBntuPosition}
            onChange={updateBntuPosition}
            onDelete={removeBntuPosition}
            title="Места работы"
        ></Listed>
    );
}
