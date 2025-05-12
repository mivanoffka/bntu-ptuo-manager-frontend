import { Flex, Typography } from "antd";
import { ReactNode } from "react";

export interface ISecondaryLabelProps {
    children?: ReactNode;
    color?: string;
}

export function SecondaryLabel(props: ISecondaryLabelProps) {
    const { children, color = "gray" } = props;

    return (
        <Flex align="center" style={{ width: "100%", height: "100%", color }}>
            <Typography.Text
                style={{ fontSize: "12px", textAlign: "left", color }}
            >
                {children}
            </Typography.Text>
        </Flex>
    );
}

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
