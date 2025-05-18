import { IFieldProps } from "@/components/fields/shared";
import { Input, TreeSelect, TreeSelectProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

export interface ITreeSelectFieldProps extends TreeSelectProps, IFieldProps {}

export function TreeSelectField(props: ITreeSelectFieldProps) {
    const { isEditable, value, onChange, treeData } = props;

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
                textAlign: "left",
            }}
            dropdownStyle={{
                maxHeight: 400,
                minWidth: 300,
                overflow: "auto",
            }}
            treeData={treeData}
            treeLine
            switcherIcon={<DownOutlined />}
            allowClear
            value={value}
            onChange={onChange}
        />
    ) : (
        <Input value={inputValue} readOnly />
    );
}
