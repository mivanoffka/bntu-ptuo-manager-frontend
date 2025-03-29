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

const Display: React.FC<{ value: EnumerationItem; placeholder?: string }> = ({
    value,
    placeholder,
}) => {
    return <LabelField>{value?.label}</LabelField>;
};

const Edit: React.FC<{
    value: EnumerationItem;
    onChange: (value: EnumerationItem) => void;
    enumeration: EnumerationItem[];
}> = ({ value, onChange, enumeration }) => {
    function enumToOptions() {
        return enumeration.map((item) => ({
            value: item.id,
            label: item.label,
        }));
    }

    return (
        <Select
            allowClear
            style={{ textAlign: "left" }}
            size="small"
            value={value ?? undefined}
            onChange={onChange}
            options={enumToOptions()}
            placeholder="Не выбрано"
        />
    );
};

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
