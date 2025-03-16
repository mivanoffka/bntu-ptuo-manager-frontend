import { Dayjs } from "dayjs";

export interface Reward {
    id: number | null;
    name: string | null;
    grantedAt: Dayjs | null;
}
