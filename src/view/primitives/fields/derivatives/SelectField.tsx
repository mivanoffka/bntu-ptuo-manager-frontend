import { EnumerationItem } from "@/model/enumeration";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { Select } from "antd";

export interface ISelectFieldProps {
    title?: string;
    value: EnumerationItem;
    onChange: (value: EnumerationItem) => void;
    enumeration: EnumerationItem[];
    placeholder?: string;
}

const Display = ({
    value,
    placeholder,
}: {
    value: EnumerationItem;
    placeholder?: string;
}) => <LabelField>{value?.label ?? placeholder ?? ""}</LabelField>;

const Edit = ({
    value,
    onChange,
    enumeration,
}: {
    value: EnumerationItem;
    onChange: (value: EnumerationItem) => void;
    enumeration: EnumerationItem[];
}) => (
    <Select
        allowClear
        style={{ textAlign: "left" }}
        size="small"
        value={value ?? undefined}
        onChange={onChange}
        options={enumeration}
        placeholder="Не выбрано"
    />
);

export function SelectField(props: ISelectFieldProps) {
    const { title, enumeration, onChange, value } = props;

    return (
        <CombinedField
            title={title}
            displayField={<Display value={value} />}
            editField={
                <Edit
                    value={value}
                    onChange={onChange}
                    enumeration={enumeration}
                />
            }
        />
    );
}

SelectField.Display = Display;
SelectField.Edit = Edit;
