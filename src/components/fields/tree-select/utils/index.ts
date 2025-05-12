import { ITreeNode } from "@/model";
import { TreeDataNode } from "antd";

export function transformPathToKey(tree: ITreeNode[]) {
    return tree.map((node) => {
        const newNode: TreeDataNode = {
            value: node.path,
            title: node.label,
            children: [],
        } as any;

        if (node.children && node.children.length > 0) {
            newNode.children = transformPathToKey(node.children);
        }
        return newNode;
    });
}

export function findNodeByPath(
    tree: ITreeNode | ITreeNode[],
    path: string | null
): ITreeNode | undefined {
    if (!tree || !path) return undefined;

    if (Array.isArray(tree)) {
        for (const node of tree) {
            const result = findNodeByPath(node, path);
            if (result) return result;
        }
        return undefined;
    }

    if (tree.path === path) {
        return tree;
    }

    if (tree.children) {
        for (const child of tree.children) {
            const result = findNodeByPath(child, path);
            if (result) return result;
        }
    }

    return undefined;
}
