import { IFieldProps, PLACEHOLDER } from "@/components/fields/shared";
import { Input, TreeSelect, TreeSelectProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

export interface ITreeSelectFieldProps extends TreeSelectProps, IFieldProps {}

export function TreeSelectField(props: ITreeSelectFieldProps) {
    const { isEditable, value, onChange: onChangeBase, treeData } = props;

    const onChange: TreeSelectProps["onChange"] = (value, _, __) => {
        if (!onChangeBase) return;

        if (value && typeof value === "object" && "value" in value) {
            onChangeBase(value.value, _, __);
        }
    };

    const findLabel = (data: any[], val: any): string | undefined => {
        for (const item of data) {
            if (item.value === val) return item.title;
            if (item.children) {
                const found = findLabel(item.children, val);
                if (found) return found;
            }
        }
        return undefined;
    };

    const inputValue = value ? findLabel(treeData || [], value) : undefined;

    return isEditable ? (
        <TreeSelect
            {...props}
            showSearch
            style={{
                width: "100%",
                maxWidth: "100%",
                textAlign: "left",
                overflow: "hidden",
            }}
            dropdownStyle={{
                overflow: "auto",
            }}
            labelInValue
            popupMatchSelectWidth={true}
            treeData={treeData}
            treeLine
            switcherIcon={<DownOutlined />}
            allowClear
            value={value}
            onChange={onChange}
            placeholder={PLACEHOLDER}
        />
    ) : (
        <Input value={inputValue} readOnly />
    );
}
