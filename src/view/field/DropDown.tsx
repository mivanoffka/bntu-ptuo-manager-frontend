import { FieldTitle } from "@/view/field/FieldTitle";
import { Label } from "@/view/field/Label";
import { Collapse, Flex } from "antd";
import { ReactNode } from "react";

export interface IDropDownProps {
    title: string;
    children: ReactNode;
}

export function DropDown(props: IDropDownProps) {
    const { title, children } = props;

    const item = {
        id: 0,
        label: <FieldTitle>{title}</FieldTitle>,
        children,
    };

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "100%" }}
        >
            <Collapse
                ghost
                size="small"
                style={{ width: "100%" }}
                items={[item]}
            ></Collapse>
        </Flex>
    );
}
