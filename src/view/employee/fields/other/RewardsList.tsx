import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Listed } from "@/view/primitives/listed/Listed";
import { Reward } from "@/model";
import { tempIds } from "@/controller/employee/utils";
import { RewardField } from "@/view/employee/fields/other/RewardField";

export function RewardsList() {
    const { getList, updateList, removeFromList } = useEmployeeEditor();

    const getRewards = () => getList<Reward>("comments");

    const addReward = () =>
        updateList<Reward>("comments", {
            id: tempIds.generate(),
            label: null,
            grantedAt: null,
            comment: null,
        });

    const updateReward = (comment: Reward) =>
        updateList<Reward>("comments", comment);

    const removeReward = (comment: Reward) =>
        removeFromList<Reward>("comments", comment);

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
