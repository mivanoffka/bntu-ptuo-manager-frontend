import { IEnumerated } from "@/model/enumerated";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { SelectDisplayField } from "@/view/primitives/fields/derivatives/select/SelectDisplayField";
import { SelectEditField } from "@/view/primitives/fields/derivatives/select/SelectEditField";
import { FieldContainer } from "@/view/primitives/fields/field";
import React from "react";

const DEFAULT_PLACEHOLDER = "Не выбрано";

export interface ISelectFieldProps<T extends IEnumerated> {
    title?: string;
    selectedId: number | null;
    onChange: (value: number | null) => void;
    enumeration: T[];
    placeholder?: string;
    editModeEnabled: boolean;
    DisplayFieldWrapperType?: React.FC<any>;
    EditFieldWrapperType?: React.FC<any>;
}

export function SelectField<T extends IEnumerated>(
    props: ISelectFieldProps<T>
) {
    const {
        enumeration,
        onChange,
        selectedId,
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
                        <SelectEditField
                            selectedId={selectedId}
                            onChange={onChange}
                            enumeration={enumeration as T[]}
                            placeholder={placeholder}
                        />
                    </EditFieldWrapperType>
                ) : (
                    <SelectEditField
                        selectedId={selectedId}
                        onChange={onChange}
                        enumeration={enumeration as T[]}
                        placeholder={placeholder}
                    />
                )
            ) : DisplayFieldWrapperType ? (
                <DisplayFieldWrapperType>
                    <SelectDisplayField
                        selectedId={selectedId}
                        enumeration={enumeration as T[]}
                        placeholder={placeholder}
                    />
                </DisplayFieldWrapperType>
            ) : (
                <LabelField
                    value={
                        <SelectDisplayField
                            selectedId={selectedId}
                            enumeration={enumeration as T[]}
                            placeholder={placeholder}
                        />
                    }
                ></LabelField>
            )}
        </FieldContainer>
    );
}

SelectField.Display = SelectDisplayField;
SelectField.Edit = SelectEditField;
