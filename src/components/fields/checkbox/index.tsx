import { IFieldProps } from "@/components/fields/shared";
import { Checkbox } from "antd";
import { CheckboxProps } from "antd/lib";

export interface ICheckboxProps extends CheckboxProps, IFieldProps {}

export function CheckboxField(props: ICheckboxProps) {
    const { isEditable } = props;

    return (
        <Checkbox
            style={{ width: "100%" }}
            {...props}
            disabled={!isEditable}
        ></Checkbox>
    );
}
