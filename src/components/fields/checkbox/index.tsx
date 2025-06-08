import { IFieldProps } from "@/components/fields/shared";
import { Checkbox } from "antd";
import { CheckboxProps } from "antd/lib";

export interface ICheckboxProps extends CheckboxProps, IFieldProps {}

export function CheckboxField(props: ICheckboxProps) {
    const { isEditable, onChange, ...rest } = props;

    const handleChange: CheckboxProps["onChange"] = (e) => {
        if (isEditable && onChange) {
            onChange(e);
        }
    };

    return (
        <Checkbox style={{ width: "100%" }} {...rest} onChange={handleChange} />
    );
}
