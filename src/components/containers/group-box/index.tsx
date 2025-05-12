import { SecondaryLabel } from "@/components/labels";
import { Flex, Divider } from "antd";
import { ReactNode } from "react";

export interface IGroupBoxProps {
    title: ReactNode;
    children?: ReactNode;
}

export function GroupBox(props: IGroupBoxProps) {
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
