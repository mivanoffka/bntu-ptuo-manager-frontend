import { SecondaryLabel } from "@/view/primitives/fields/SecondaryLabel";
import { LabelField } from "@/view/primitives/fields/derivatives/LabelField";
import { Collapse, Divider, Flex } from "antd";
import { ReactNode, useState } from "react";

export interface IDropDownProps {
    title: ReactNode;
    children?: ReactNode;
}

export function Expandable(props: IDropDownProps) {
    const { title, children: childrenBase } = props;

    const children = childrenBase ? (
        childrenBase
    ) : (
        <SecondaryLabel>ПУСТО</SecondaryLabel>
    );

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Divider orientation="left">{title}</Divider>
            {children}
            <Divider />
        </Flex>
    );
}
