import { Flex, Typography } from "antd";
import "./style/field.css";
import { ReactNode } from "react";

export interface ILabelProps {
    children?: ReactNode;
    placeholder?: string;
}

export function Label(props: ILabelProps) {
    const { children, placeholder = "Не указано" } = props;

    return (
        <Typography.Text style={{ textAlign: "left" }}>
            {children ?? placeholder}
        </Typography.Text>
    );
}
