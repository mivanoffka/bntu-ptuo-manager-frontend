import { DateTimeString } from "@/model/date.time.string";

export interface EducationalInstitution {
    id: number;
    label: string | null;
    graduatedAt: DateTimeString | null;
    comment: string | null;
}
