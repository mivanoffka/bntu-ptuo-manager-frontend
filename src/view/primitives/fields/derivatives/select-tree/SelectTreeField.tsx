import { ITreeNode } from "@/model";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { SelectTreeEditField } from "@/view/primitives/fields/derivatives/select-tree/SelectTreeEditField";
import { FieldContainer } from "@/view/primitives/fields/field";
import React from "react";
import { SelectTreeDisplayField } from "@/view/primitives/fields/derivatives/select-tree/SelectTreeDisplayField";

const DEFAULT_PLACEHOLDER = "Не выбрано";

export interface ISelectTreeFieldProps<T extends ITreeNode> {
    title?: string;
    selectedPath: string | null;
    onChange: (value: string | null) => void;
    tree: T[];
    placeholder?: string;
    editModeEnabled: boolean;
    DisplayFieldWrapperType?: React.FC<any>;
    EditFieldWrapperType?: React.FC<any>;
}

export function SelectTreeField<T extends ITreeNode>(
    props: ISelectTreeFieldProps<T>
) {
    const {
        tree,
        onChange,
        selectedPath,
        placeholder = DEFAULT_PLACEHOLDER,
        editModeEnabled,
        title,
        DisplayFieldWrapperType,
        EditFieldWrapperType,
    } = props;

    return (
        <FieldContainer title={title}>
            {editModeEnabled ? (
                EditFieldWrapperType ? (
                    <EditFieldWrapperType>
                        <SelectTreeEditField
                            selectedPath={selectedPath}
                            onChange={onChange}
                            tree={tree as T[]}
                            placeholder={placeholder}
                        />
                    </EditFieldWrapperType>
                ) : (
                    <SelectTreeEditField
                        selectedPath={selectedPath}
                        onChange={onChange}
                        tree={tree as T[]}
                        placeholder={placeholder}
                    />
                )
            ) : DisplayFieldWrapperType ? (
                <DisplayFieldWrapperType>
                    <SelectTreeDisplayField
                        selectedPath={selectedPath}
                        tree={tree as T[]}
                        placeholder={placeholder}
                    />
                </DisplayFieldWrapperType>
            ) : (
                <LabelField
                    value={
                        <SelectTreeDisplayField
                            selectedPath={selectedPath}
                            tree={tree as T[]}
                            placeholder={placeholder}
                        />
                    }
                ></LabelField>
            )}
        </FieldContainer>
    );
}

SelectTreeField.Display = SelectTreeDisplayField;
SelectTreeField.Edit = SelectTreeEditField;
