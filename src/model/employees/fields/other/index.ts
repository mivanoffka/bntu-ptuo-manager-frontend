import { IPrimaryKeyed, DateTimeString, IEnumerated } from "@/model/basics";

export interface IComment extends IPrimaryKeyed {
    value: string | null;
}

export interface IRelative extends IPrimaryKeyed {
    fullName: string;
    birthdate: DateTimeString | null;
    relativeTypeId: number | null;
    comment: string | null;
}

export interface IRelativeType extends IEnumerated {}

export interface IReward extends IPrimaryKeyed {
    label: string | null;
    grantedAt: DateTimeString | null;
    comment: string | null;
}

export interface IExemption extends IEnumerated {}
