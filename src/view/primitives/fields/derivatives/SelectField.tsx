import { IEnumerated } from "@/model/enumerated";
import { CombinedField } from "@/view/primitives/fields/field/CombinedField";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { Select } from "antd";

const DEFAULT_PLACEHOLDER = "Не выбрано";

export interface ISelectFieldProps {
    title?: string;
    selectedId: number | null;
    onChange: (value: number | null) => void;
    enumeration: IEnumerated[];
    placeholder?: string;
}

const Display: React.FC<{
    selectedId: number | null;
    enumeration: IEnumerated[];
    placeholder?: string;
}> = ({ selectedId, enumeration, placeholder = DEFAULT_PLACEHOLDER }) => {
    const selectedItem =
        enumeration.find((item) => item.id === selectedId) || null;

    return selectedItem?.label || placeholder;
};

const Edit: React.FC<{
    selectedId: number | null;
    onChange: (value: number | null) => void;
    enumeration: IEnumerated[];
    placeholder?: string;
}> = ({
    selectedId,
    onChange,
    enumeration,
    placeholder = DEFAULT_PLACEHOLDER,
}) => {
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
            value={selectedId}
            onChange={onChange}
            options={enumToOptions()}
            placeholder={placeholder}
        />
    );
};

export function SelectField(props: ISelectFieldProps) {
    const {
        title,
        enumeration,
        onChange,
        selectedId,
        placeholder = DEFAULT_PLACEHOLDER,
    } = props;

    return (
        <CombinedField
            title={title}
            displayField={
                <LabelField>
                    <Display
                        selectedId={selectedId}
                        enumeration={enumeration}
                        placeholder={placeholder}
                    />
                </LabelField>
            }
            editField={
                <Edit
                    selectedId={selectedId}
                    onChange={onChange}
                    enumeration={enumeration}
                />
            }
        />
    );
}

SelectField.Display = Display;
SelectField.Edit = Edit;
