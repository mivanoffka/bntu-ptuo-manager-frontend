import { DateTimeString } from "@/model/date.time.string";
import { IPrimaryKeyed } from "@/model/primary.keyed";

export interface IEducationalInstitution extends IPrimaryKeyed {
    label: string | null;
    graduatedAt: DateTimeString | null;
    comment: string | null;
}
