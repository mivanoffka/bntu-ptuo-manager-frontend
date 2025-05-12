import { IObjectFieldProps } from "@/components/fields/types";
import { CheckboxChangeEvent, Checkbox } from "antd";
import { ReactNode } from "react";

export interface IBooleanFieldProps extends IObjectFieldProps<boolean> {
    children?: ReactNode;
}

export function BooleanField(props: IBooleanFieldProps) {
    const {
        value: value,
        onChange: onChangeBase,
        editModeEnabled,
        children,
    } = props;

    const onChange = (e: CheckboxChangeEvent) => {
        onChangeBase(e.target.checked);
    };

    return editModeEnabled ? (
        <Checkbox defaultChecked={value} onChange={onChange} value={value}>
            {children}
        </Checkbox>
    ) : value ? (
        children
    ) : null;
}
