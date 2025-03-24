import { DateTimeString } from "@/model/date.time.string";
import { BntuDepartment } from "@/model/employee/bntu/bntu.department";

export interface BntuPosition {
    department: BntuDepartment | null;
    name: string | null;
    hiredAt: DateTimeString | null;
    isDischarged: boolean;
    dischargedAt: DateTimeString | null;
    isDischargedVoluntary: boolean;
    comment: string | null;
}
