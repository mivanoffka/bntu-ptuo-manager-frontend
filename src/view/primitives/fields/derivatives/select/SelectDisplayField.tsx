import { IEnumerated } from "@/model";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { DEFAULT_SELECT_PLACEHOLDER } from "@/view/primitives/fields/derivatives/select/constants";

export interface ISelectDisplayFieldProps<T extends IEnumerated> {
    selectedId: number | null;
    enumeration: T[];
    placeholder?: string;
}

export function SelectDisplayField<T extends IEnumerated>(
    props: ISelectDisplayFieldProps<T>
) {
    const {
        selectedId,
        enumeration,
        placeholder = DEFAULT_SELECT_PLACEHOLDER,
    } = props;

    const selectedItem =
        enumeration.find((item: T) => item.id === selectedId) || null;

    return selectedItem?.label ?? placeholder;
}
