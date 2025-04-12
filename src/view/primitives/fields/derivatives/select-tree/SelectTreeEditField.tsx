import { IEnumerated, ITreeNode } from "@/model";
import { Select, TreeDataNode, TreeSelect } from "antd";
import { DEFAULT_SELECT_PLACEHOLDER } from "@/view/primitives/fields/derivatives/select/constants";
import { transformPathToKey } from "@/view/primitives/fields/derivatives/select-tree/utils";

export interface ISelectTreeEditFieldProps<T extends ITreeNode> {
    selectedPath: string | null;
    onChange: (value: string | null) => void;
    tree: T[];
    placeholder?: string;
}

export function SelectTreeEditField<T extends ITreeNode>(
    props: ISelectTreeEditFieldProps<T>
) {
    const {
        selectedPath,
        onChange,
        tree,
        placeholder = DEFAULT_SELECT_PLACEHOLDER,
    } = props;

    return (
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
    );
}
