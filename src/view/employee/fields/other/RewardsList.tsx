import { Listed } from "@/view/primitives/listed/Listed";
import { IReward } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { RewardField } from "@/view/employee/fields/other/RewardField";
import { useEmployeeEditor } from "@/controller/employee";

export function RewardsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getRewards = () => getList<IReward>("rewards");

    const addReward = () =>
        updateList<IReward>("rewards", {
            id: tempIds.generate(),
            label: null,
            grantedAt: null,
            comment: null,
        });

    const updateReward = (reward: IReward) =>
        updateList<IReward>("rewards", reward);

    const removeReward = (reward: IReward) =>
        removeFromList<IReward>("rewards", reward);

    return (
        <Listed
            items={getRewards()}
            FieldType={RewardField}
            get={getRewards}
            add={addReward}
            update={updateReward}
            remove={removeReward}
            title="Награды"
        ></Listed>
    );
}
