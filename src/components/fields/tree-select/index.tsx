import { ITreeNode } from "@/model";
import { DownOutlined } from "@ant-design/icons";
import { Input, Space, TreeSelect } from "antd";
import "./style.css";
import {
    findNodeByPath,
    transformPathToKey,
} from "@/components/fields/tree-select/utils";

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
