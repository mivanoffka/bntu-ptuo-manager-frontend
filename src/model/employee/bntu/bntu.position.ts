import { DateTimeString } from "@/model/date.time.string";

export interface IBntuPosition {
    bntuDepartmentOptionId: number | null;
    bntuDepartmentAuthenticLabel: string | null;
    label: string | null;
    hiredAt: DateTimeString | null;
    isDischarged: boolean;
    dischargedAt: DateTimeString | null;
    isDischargedVoluntary: boolean;
    comment: string | null;
}
