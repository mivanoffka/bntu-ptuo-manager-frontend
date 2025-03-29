import { Flex, Typography } from "antd";
import "./style/field.css";
import { ReactNode } from "react";
import { FieldTitle } from "@/view/primitives/fields/field/FieldTitle";

export interface IFieldProps {
    title?: ReactNode;
    children?: ReactNode;
}

export function Field(props: IFieldProps) {
    const { title, children } = props;

    return (
        <Flex vertical style={{ width: "100%" }}>
            <FieldTitle>{title}</FieldTitle>
            {children}
        </Flex>
    );
}
