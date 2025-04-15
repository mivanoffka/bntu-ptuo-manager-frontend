import { IEnumerated } from "@/model";
import { Palette, FontSize } from "@/view/constants";
import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Input, Select, Space } from "antd";

export interface ISelectFieldProps<T extends IEnumerated> {
    selectedId: number | null;
    onChange: (value: number | null) => void;
    enumeration: T[];
    placeholder?: string;
    editModeEnabled: boolean;
}

export function SelectField<T extends IEnumerated>(
    props: ISelectFieldProps<T>
) {
    const {
        selectedId,
        onChange,
        enumeration,
        placeholder = "Не выбрано",
        editModeEnabled,
    } = props;

    function enumToOptions<T extends IEnumerated>(enumeration: T[]) {
        return enumeration.map((item) => ({
            value: item.id,
            label: item.label,
        }));
    }

    const selectedItem =
        enumeration.find((item: T) => item.id === selectedId)?.label ||
        placeholder;

    return editModeEnabled ? (
        <Space.Compact>
            <Select
                style={{ textAlign: "left", width: "100%" }}
                size="small"
                value={selectedId}
                onChange={onChange}
                options={enumToOptions(enumeration)}
                placeholder={placeholder}
            />
            <Button onClick={() => onChange(null)}>
                <CloseCircleFilled
                    style={{
                        color: Palette.LIGHT_GRAY,
                        fontSize: FontSize.SMALL,
                    }}
                />
            </Button>
        </Space.Compact>
    ) : (
        <Input readOnly value={selectedItem}></Input>
    );
}
