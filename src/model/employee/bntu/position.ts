import { Dayjs } from "dayjs";

export interface BntuPosition {
    departmentId: number | null;
    name: string | null;
    hiredAt: Dayjs | null;
    isDischarged: boolean;
    dischargedAt: Dayjs | null;
    isDischargedVoluntary: boolean;
    comment: string | null;
}
