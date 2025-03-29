import { Typography } from "antd";
import { ReactNode } from "react";

export interface ILabelFieldProps {
    children?: ReactNode;
    placeholder?: string;
}

export function LabelField(props: ILabelFieldProps) {
    const { children, placeholder = "Не указано" } = props;

    return (
        <Typography.Text style={{ textAlign: "left" }}>
            {children ?? placeholder}
        </Typography.Text>
    );
}
