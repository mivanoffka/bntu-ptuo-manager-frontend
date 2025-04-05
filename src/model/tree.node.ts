import { IEnumerated } from "@/model/enumerated";

export interface ITreeNode extends IEnumerated {
    path: string;
    hierarchy: string[];
}
