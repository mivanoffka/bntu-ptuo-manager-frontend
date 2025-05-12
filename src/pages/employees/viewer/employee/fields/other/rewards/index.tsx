import { Listed } from "@/components/listed";
import { useEditMode } from "@/contexts/employees/edit-mode";
import { useEmployeeEditor } from "@/contexts/employees/editor";
import { tempIds } from "@/contexts/employees/utils";
import { IReward } from "@/model";
import { RewardField } from "@/pages/employees/viewer/employee/fields/other/rewards/list-item";

export function RewardsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();
    const { editModeEnabled } = useEditMode();

    const getRewards = () => getList<IReward>("rewards");

    const getNewReward = () => ({
        id: tempIds.generate(),
        label: null,
        grantedAt: null,
        comment: null,
    });

    const updateReward = (item: IReward | null) => {
        if (item) {
            updateList<IReward>("rewards", item);
        }
    };

    const removeReward = (item: IReward) =>
        removeFromList<IReward>("rewards", item);

    return (
        <Listed<IReward>
            editModeEnabled={editModeEnabled}
            items={getRewards()}
            FieldType={RewardField}
            newItemGetter={getNewReward}
            onChange={updateReward}
            onDelete={removeReward}
            title="Награды"
        />
    );
}
