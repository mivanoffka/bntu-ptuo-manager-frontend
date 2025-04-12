import { SecondaryLabel } from "@/view/primitives";
import { Button, Flex } from "antd";
import React from "react";

export interface IToolBarButtonProps {
    onClick: () => void;
    title: React.ReactNode;
    icon: React.ReactNode;
    color?: string;
}

export function ToolBarButton(props: IToolBarButtonProps) {
    const { onClick, title, icon, color } = props;

    return (
        <Button type="link" onClick={onClick}>
            <Flex style={{ width: "100%", color: color }} gap="small">
                {icon}
                <SecondaryLabel>{title}</SecondaryLabel>
            </Flex>
        </Button>
    );
}
