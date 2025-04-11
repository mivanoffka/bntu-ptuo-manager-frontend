import { DateTimeString } from "@/model/date.time.string";
import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IBntuPosition extends IPrimaryKeyed {
    bntuDepartmentOptionPath: string | null;
    bntuDepartmentAuthenticLabel: string | null;
    label: string | null;
    hiredAt: DateTimeString | null;
    isDischarged: boolean | null;
    dischargedAt: DateTimeString | null;
    isDischargedVoluntarily: boolean | null;
    dischargementComment: string | null;
}
