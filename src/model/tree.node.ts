import { EnumerationItem } from "@/model/enumeration";

export interface TreeNode extends EnumerationItem {
    path: string;
    hierarchy: string[];
}
