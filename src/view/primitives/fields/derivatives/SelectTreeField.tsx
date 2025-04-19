import { ITreeNode } from "@/model";
import { FontSize, Palette } from "@/view/constants";
import {
    CloseCircleFilled,
    DownOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, TreeDataNode, TreeSelect } from "antd";
import { AntTreeNodeProps } from "antd/es/tree";
import "./style.css";

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
        <Space.Compact style={{ width: "100%" }}>
            <div style={{ width: "100%", maxWidth: "100%", display: "block" }}>
                <TreeSelect
                    className="fixed-width-tree-select"
                    showSearch
                    style={{
                        width: "100%",
                        textAlign: "left",
                    }}
                    value={selectedPath}
                    dropdownStyle={{
                        maxHeight: 400,
                        minWidth: 300,
                        overflow: "auto",
                    }}
                    placeholder={placeholder}
                    onChange={onChange}
                    treeData={transformPathToKey(tree)}
                    treeLine
                    switcherIcon={<DownOutlined />}
                />
            </div>
        </Space.Compact>
    ) : (
        <Input readOnly value={selectedItem}></Input>
    );
}
