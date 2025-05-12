import { TextField } from "@/components/fields/text";
import { IObjectFieldProps } from "@/components/fields/types";
import { IEnumerated } from "@/model";
import { Flex } from "antd";

export function EnumerationField(props: IObjectFieldProps<IEnumerated>) {
    const { value: item, onChange } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <TextField
                editModeEnabled={true}
                value={item.label}
                onChange={(label) => onChange({ ...item, label })}
            />
        </Flex>
    );
}
