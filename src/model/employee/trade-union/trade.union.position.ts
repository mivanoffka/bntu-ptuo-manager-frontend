import { DateTimeString } from "@/model/date.time.string";
import { TradeUnionDepartment } from "@/model/employee/trade-union/trade.union.department";
import { WorkingGroup } from "@/model/employee/trade-union/working.group";

export interface TradeUnionPosition {
    tradeUnionDepartment: TradeUnionDepartment;
    workingGroup: WorkingGroup;

    joinedAt: DateTimeString | null;
    leftAt: DateTimeString | null;

    comment: string | null;
}
