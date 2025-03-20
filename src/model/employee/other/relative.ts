import { RelativeTypes } from "@/model/employee/other/relative.types";

export interface Relative {
    id: number | null;
    fullName: string;
    type: RelativeTypes;
    comment: string | null;
}
