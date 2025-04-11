import { IEnumerated, ITreeNode } from "@/model";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { findNodeByPath } from "@/view/primitives/fields/derivatives/select-tree/utils";
import { DEFAULT_SELECT_PLACEHOLDER } from "@/view/primitives/fields/derivatives/select/constants";

export interface ISelectTreeDisplayFieldProps<T extends ITreeNode> {
    selectedPath: string | null;
    tree: T[];
    placeholder?: string;
}

export function SelectTreeDisplayField<T extends ITreeNode>(
    props: ISelectTreeDisplayFieldProps<T>
) {
    const {
        selectedPath,
        tree,
        placeholder = DEFAULT_SELECT_PLACEHOLDER,
    } = props;

    const selectedItem = findNodeByPath(tree, selectedPath);

    return selectedItem?.label ?? placeholder;
}
