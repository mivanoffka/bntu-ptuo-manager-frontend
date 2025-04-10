import { Listed } from "@/view/primitives/listed/Listed";
import { IReward } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { RewardField } from "@/view/employee/fields/other/RewardField";
import { useEmployeeEditor } from "@/controller/employee";

export function RewardsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

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
            items={getRewards()}
            FieldType={RewardField}
            newItemGetter={getNewReward}
            onChange={updateReward}
            onDelete={removeReward}
            title="Награды"
        />
    );
}
