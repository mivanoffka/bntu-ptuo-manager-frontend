import { SecondaryLabel } from "@/view/primitives/fields/field/SecondaryLabel";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { Collapse, Flex } from "antd";
import { ReactNode, useState } from "react";

export interface IDropDownProps {
    title: ReactNode;
    children?: ReactNode;
}

export function Expandable(props: IDropDownProps) {
    const { title, children } = props;

    const item = {
        id: 0,
        label: (
            <Flex vertical align="left" style={{ width: "100%" }}>
                <SecondaryLabel>{title}</SecondaryLabel>
            </Flex>
        ),

        children,
    };

    return (
        <Flex vertical align="left" justify="left" style={{ width: "100%" }}>
            <Collapse
                ghost
                size="small"
                style={{ width: "100%" }}
                items={[item]}
            ></Collapse>
        </Flex>
    );
}
