import { DateTimeString } from "@/model/date.time.string";
import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface ITradeUnionPosition extends IPrimaryKeyed {
    occurredAt: DateTimeString | null;
    label: string | null;
    comment: string | null;
}
