import { Listed } from "@/view/primitives/listed/Listed";
import { IBntuPosition } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { useEmployeeEditor } from "@/controller/employee";
import { BntuPositionField } from "@/view/employee/fields/bntu/BntuPositionField";

export function BntuPositionsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getBntuPositions = () => getList<IBntuPosition>("bntuPositions");

    const getNewBntuPosition = () => {
        return {
            id: tempIds.generate(),
            bntuDepartmentOptionPath: null,
            bntuDepartmentAuthenticLabel: null,
            label: null,
            hiredAt: null,
            isDischarged: null,
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
            items={getBntuPositions()}
            FieldType={BntuPositionField}
            newItemGetter={getNewBntuPosition}
            onChange={updateBntuPosition}
            onDelete={removeBntuPosition}
            title="Места работы"
        ></Listed>
    );
}
