import { DateTimeString } from "@/model/date.time.string";

export interface Reward {
    id: number | null;
    name: string | null;
    grantedAt: DateTimeString | null;
}
