import { DateTimeString } from "@/model/date.time.string";
import { RelativeType } from "@/model/employee/other/relative.type";

export interface Relative {
    id: number;
    fullName: string;
    birthdate: DateTimeString | null;
    relativeType: RelativeType | null;
    comment: string | null;
}
