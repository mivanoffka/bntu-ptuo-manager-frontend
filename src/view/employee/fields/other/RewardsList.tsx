import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { Reward } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { RewardField } from "@/view/employee/fields/other/RewardField";

export function RewardsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getRewards = () => getList<Reward>("rewards");

    const addReward = () =>
        updateList<Reward>("rewards", {
            id: tempIds.generate(),
            label: null,
            grantedAt: null,
            comment: null,
        });

    const updateReward = (reward: Reward) =>
        updateList<Reward>("rewards", reward);

    const removeReward = (reward: Reward) =>
        removeFromList<Reward>("rewards", reward);

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
