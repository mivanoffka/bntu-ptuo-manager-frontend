import { IPrimaryKeyed } from "@/model/primary.keyed";
import { ITimeStamped } from "@/model/timestamped";

export interface ITradeUnionDepartmentRecord
    extends IPrimaryKeyed,
        ITimeStamped {
    authenticLabel: string | null;
    tradeUnionDepartmentOptionId: number | null;
}
