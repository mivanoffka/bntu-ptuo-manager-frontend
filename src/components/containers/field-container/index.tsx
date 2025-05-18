import { SecondaryLabel } from "@/components/labels";
import { Flex, Form } from "antd";
import { ReactNode } from "react";

export interface IFieldContainerProps {
    title?: ReactNode;
    children?: ReactNode;
    horizontal?: boolean;
    name: string | [number, string];
    rules?: any[];
    normalize?: any;
}

export function FieldContainer(props: IFieldContainerProps) {
    const { title, children, name, rules, normalize } = props;

    return (
        <Flex vertical style={{ width: "100%" }}>
            <SecondaryLabel>{title}</SecondaryLabel>
            <Form.Item name={name} rules={rules} normalize={normalize}>
                {children}
            </Form.Item>
        </Flex>
    );
}
