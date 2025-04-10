import { IEnumerated } from "@/model";
import { Select } from "antd";
import { enumToOptions } from "@/view/primitives/fields/derivatives/select/utils";
import { DEFAULT_SELECT_PLACEHOLDER } from "@/view/primitives/fields/derivatives/select/constants";

export interface ISelectEditFieldProps<T extends IEnumerated> {
    selectedId: number | null;
    onChange: (value: number | null) => void;
    enumeration: T[];
    placeholder?: string;
}

export function SelectEditField<T extends IEnumerated>(
    props: ISelectEditFieldProps<T>
) {
    const {
        selectedId,
        onChange,
        enumeration,
        placeholder = DEFAULT_SELECT_PLACEHOLDER,
    } = props;

    return (
        <Select
            allowClear
            style={{ textAlign: "left" }}
            size="small"
            value={selectedId}
            onChange={onChange}
            options={enumToOptions(enumeration)}
            placeholder={placeholder}
        />
    );
}
