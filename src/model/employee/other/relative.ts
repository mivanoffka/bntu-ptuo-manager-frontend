import { RelativeType } from "@/model/employee/other/relative.type";

export interface Relative {
    id: number | null;
    fullName: string;
    type: RelativeType | null;
    comment: string | null;
}
