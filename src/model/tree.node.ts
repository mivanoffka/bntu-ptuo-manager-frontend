import { Enumeration } from "@/model/enumeration";

export interface TreeNode extends Enumeration {
    path: string;
    hierarchy: string[];
}
