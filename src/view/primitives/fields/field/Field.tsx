import { Flex, Typography } from "antd";
import "./style/field.css";
import { ReactNode } from "react";
import { SecondaryLabel } from "@/view/primitives/fields/field/SecondaryLabel";

export interface IFieldContainerProps {
    title?: ReactNode;
    children?: ReactNode;
    horizontal?: boolean;
}

export function FieldContainer(props: IFieldContainerProps) {
    const { title, children } = props;

    return (
        <Flex vertical style={{ width: "100%" }}>
            <SecondaryLabel>{title}</SecondaryLabel>
            {children}
        </Flex>
    );
}
