import {
    ITreeNode,
    IPrimaryKeyed,
    DateTimeString,
    IEnumerated,
} from "@/model/basics";

export interface ITradeUnionDepartment extends ITreeNode {}

export interface ITradeUnionPosition extends IPrimaryKeyed {
    occurredAt: DateTimeString | null;
    label: string | null;
    comment: string | null;
}

export interface IWorkingGroup extends IEnumerated {}
