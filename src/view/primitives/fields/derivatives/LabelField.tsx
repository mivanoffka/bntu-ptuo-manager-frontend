import { Typography } from "antd";
import { ReactNode } from "react";

export interface ILabelFieldProps {
    value?: ReactNode;
    placeholder?: string;
}

export function LabelField(props: ILabelFieldProps) {
    const { value, placeholder = "Не указано" } = props;

    return (
        <Typography.Text style={{ textAlign: "left" }}>
            {value ?? placeholder}
        </Typography.Text>
    );
}
