import { DateTimeString } from "@/model/date.time.string";
import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IRelative extends IPrimaryKeyed {
    fullName: string;
    birthdate: DateTimeString | null;
    relativeTypeId: number | null;
    comment: string | null;
}
