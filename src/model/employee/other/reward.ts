import { DateTimeString } from "@/model/date.time.string";
import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IReward extends IPrimaryKeyed {
    label: string | null;
    grantedAt: DateTimeString | null;
    comment: string | null;
}
