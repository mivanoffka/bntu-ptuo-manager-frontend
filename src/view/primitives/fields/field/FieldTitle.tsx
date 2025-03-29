import { Flex, Typography } from "antd";
import "./style/field.css";
import { ReactNode } from "react";

export interface IFieldTitleProps {
    children?: ReactNode;
}

export function FieldTitle(props: IFieldTitleProps) {
    const { children } = props;

    return (
        <Typography.Text
            style={{ fontSize: "12px", textAlign: "left" }}
            type="secondary"
        >
            {children}
        </Typography.Text>
    );
}
