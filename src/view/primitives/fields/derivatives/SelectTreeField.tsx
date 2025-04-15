import { ITreeNode } from "@/model";
import { Input, TreeDataNode, TreeSelect } from "antd";

export interface ISelectTreeFieldProps<T extends ITreeNode> {
    selectedPath: string | null;
    onChange: (value: string | null) => void;
    tree: T[];
    placeholder?: string;
    editModeEnabled: boolean;
}

export function SelectTreeField<T extends ITreeNode>(
    props: ISelectTreeFieldProps<T>
) {
    const {
        selectedPath,
        onChange,
        tree,
        placeholder = "Не выбрано",
        editModeEnabled,
    } = props;

    function transformPathToKey(tree: ITreeNode[]) {
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

    function findNodeByPath(
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

    const selectedItem =
        findNodeByPath(tree, selectedPath)?.label || placeholder;

    return editModeEnabled ? (
        <TreeSelect
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            value={selectedPath}
            dropdownStyle={{ maxHeight: 400, minWidth: 300, overflow: "auto" }}
            placeholder={placeholder}
            allowClear
            onChange={onChange}
            treeData={transformPathToKey(tree)}
        ></TreeSelect>
    ) : (
        <Input readOnly value={selectedItem}></Input>
    );
}
