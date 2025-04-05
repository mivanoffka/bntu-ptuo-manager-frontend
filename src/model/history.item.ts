import { DateTimeString } from "@/model/date.time.string";
import { ITimeStamped } from "@/model/timestamped";

export interface IHistoryItem<T extends ITimeStamped> {
    item: T;

    updatedAt: DateTimeString | null;
}
