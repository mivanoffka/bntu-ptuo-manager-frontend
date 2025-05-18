import { IEnumerated } from "@/model";
import { Flex, Input } from "antd";

export interface IEnumerationFieldProps {
    value: IEnumerated;
    onChange: (item: IEnumerated) => void;
}

export function EnumerationField(props: IEnumerationFieldProps) {
    const { value: item, onChange } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <Input
                value={item.label}
                onChange={(e) => onChange({ ...item, label: e.target.value })}
            />
        </Flex>
    );
}
