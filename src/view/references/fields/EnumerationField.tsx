import { InputField } from "@/view/primitives/fields/derivatives/InputField";
import { Flex } from "antd";
import { IEnumerated } from "@/model";

import { IObjectFieldProps } from "@/view/primitives/fields";

export function EnumerationField(props: IObjectFieldProps<IEnumerated>) {
    const { value: item, onChange } = props;

    return (
        <Flex gap="small" style={{ width: "100%" }}>
            <InputField
                editModeEnabled={true}
                value={item.label}
                onChange={(label) => onChange({ ...item, label })}
            />
        </Flex>
    );
}
