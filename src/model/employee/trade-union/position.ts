import { Dayjs } from "dayjs";

export interface TradeUnionPosition {
    departmentId: number | null;
    workGroupId: number | null;

    joinedAt: Dayjs | null;
    leftAt: Dayjs | null;

    comment: string | null;
}
