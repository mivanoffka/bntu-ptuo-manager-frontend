import { useEmployeeUpdater } from "@/controller/employee/updaters/EmployeeUpdaterContext";
import { createHook } from "@/controller/utils";
import { Reward } from "@/model";
import { createContext } from "react";

enum Fields {
    Rewards = "rewards",
}

export interface IEmployeeRewardsUpdater {
    rewards: Reward[] | null;

    updateRewards: (value: Reward[]) => void;
}

export const EmployeeRewardsUpdater = createContext<IEmployeeRewardsUpdater>(
    {} as IEmployeeRewardsUpdater
);

export function EmployeeRewardsUpdaterProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const { rewards, updateRewards } = useEmployeeUpdater();

    const rewardsField = rewards?.rewards || null;

    function updateField<T>(fieldName: Fields, value: T) {
        if (!rewards) {
            return;
        }
        updateRewards({ ...rewards, [fieldName]: value as Reward[] });
    }

    function updateLocalRewards(value: Reward[]) {
        updateField<Reward[]>(Fields.Rewards, value);
    }

    const context: IEmployeeRewardsUpdater = {
        rewards: rewardsField,
        updateRewards: updateLocalRewards,
    };

    return (
        <EmployeeRewardsUpdater.Provider value={context}>
            {children}
        </EmployeeRewardsUpdater.Provider>
    );
}

export const useEmployeeRewardsUpdater = createHook(EmployeeRewardsUpdater);
