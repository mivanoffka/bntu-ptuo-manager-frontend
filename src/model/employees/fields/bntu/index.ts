import { IPrimaryKeyed, DateTimeString, ITreeNode } from "@/model/basics";

export interface IBntuPosition extends IPrimaryKeyed {
    bntuDepartmentPath: string | null;
    bntuDepartmentAuthenticLabel: string | null;
    label: string | null;
    hiredAt: DateTimeString | null;
    isDischarged: boolean | null;
    dischargedAt: DateTimeString | null;
    isDischargedVoluntarily: boolean | null;
    dischargementComment: string | null;
}

export interface IBntuDepartmentOption extends ITreeNode {}
