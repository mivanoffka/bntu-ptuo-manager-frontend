import { TradeUnionPosition } from "@/model/employee/ptuo/trade.union.position";
import { Dayjs } from "dayjs";

export interface EmployeePTUO {
    tradeUnionPositions: TradeUnionPosition[];
    joinedAt: Dayjs | null;
    isArchived: boolean | null;
    archivedAt: Dayjs | null;
    isRetired: boolean | null;
    retiredAt: Dayjs | null;
}

export { TradeUnionPosition };
