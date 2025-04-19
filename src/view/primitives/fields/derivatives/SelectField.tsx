import { IEnumerated } from "@/model";
import { Palette, FontSize } from "@/view/constants";
import { CloseCircleFilled } from "@ant-design/icons";
import { Select, Input, Space, Button, Flex } from "antd";

export interface ISelectFieldProps<T extends IEnumerated> {
    selectedIds: number[];
    onChange: (values: number[]) => void;
    enumeration: T[];
    placeholder?: string;
    editModeEnabled: boolean;
    multiple?: boolean;
}

export function SelectField<T extends IEnumerated>(
    props: ISelectFieldProps<T>
) {
    const {
        selectedIds,
        onChange,
        enumeration,
        placeholder = "Не выбрано",
        editModeEnabled,
        multiple = false,
    } = props;

    const selectMode = multiple ? "multiple" : undefined;

    const selectValue = multiple
        ? selectedIds
        : selectedIds.length > 0
        ? selectedIds[0]
        : undefined;

    const handleSingleChange = (selected: number | undefined) => {
        onChange(selected !== undefined ? [selected] : []);
    };

    const handleMultipleChange = (selected: number[]) => {
        onChange(selected);
    };

    const onChangeHandler = multiple
        ? handleMultipleChange
        : handleSingleChange;

    const getDisplayValue = () => {
        if (selectedIds.length === 0) {
            return placeholder;
        }
        const selectedLabels = selectedIds.map(
            (id) => enumeration.find((item) => item.id === id)?.label || ""
        );
        return selectedLabels.join(", ");
    };

    function enumToOptions<T extends IEnumerated>(enumeration: T[]) {
        return enumeration.map((item) => ({
            value: item.id,
            label: item.label,
        }));
    }

    return editModeEnabled ? (
        multiple ? (
            <Space.Compact style={{ width: "100%" }}>
                <Select
                    style={{ textAlign: "left", width: "100%" }}
                    size="small"
                    mode="multiple"
                    value={selectedIds}
                    onChange={handleMultipleChange}
                    options={enumToOptions(enumeration)}
                    placeholder={placeholder}
                />
            </Space.Compact>
        ) : (
            <Space.Compact>
                <Select
                    style={{ textAlign: "left", width: "100%" }}
                    size="small"
                    value={selectedIds.length > 0 ? selectedIds[0] : undefined}
                    onChange={handleSingleChange}
                    options={enumToOptions(enumeration)}
                    placeholder={placeholder}
                />
                <Button onClick={() => onChange([])}>
                    <CloseCircleFilled
                        style={{
                            color: Palette.LIGHT_GRAY,
                            fontSize: FontSize.SMALL,
                        }}
                    />
                </Button>
            </Space.Compact>
        )
    ) : (
        <Input readOnly value={getDisplayValue()} />
    );
}
