import { IPrimaryKeyed } from "@/model/primary.keyed";
import { ITimeStamped } from "@/model/timestamped";

export interface IWorkingGroupRecord extends IPrimaryKeyed, ITimeStamped {
    authenticLabel: string | null;
    workingGroupOptionId: number | null;
}
