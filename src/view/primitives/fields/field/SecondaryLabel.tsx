import { Flex, Typography } from "antd";
import "./style/field.css";
import { ReactNode } from "react";

export interface ISecondaryLabelProps {
    children?: ReactNode;
}

export function SecondaryLabel(props: ISecondaryLabelProps) {
    const { children } = props;

    return (
        <Flex align="center" style={{ height: "100%" }}>
            <Typography.Text
                style={{ fontSize: "12px", textAlign: "left" }}
                type="secondary"
            >
                {children}
            </Typography.Text>
        </Flex>
    );
}
