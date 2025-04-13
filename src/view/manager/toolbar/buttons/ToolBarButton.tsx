import { Palette, FontSize } from "@/view/constants";
import { SecondaryLabel } from "@/view/primitives";
import { Button, Flex, Typography } from "antd";

import React from "react";

export interface IToolBarButtonProps {
    onClick: () => void;
    title: React.ReactNode;
    icon: React.ReactNode;
    color?: string;
    disabled?: boolean;
}

export function ToolBarButton(props: IToolBarButtonProps) {
    const { onClick, title, icon, color, disabled = false } = props;

    const textColor = disabled ? Palette.LIGHT_GRAY : Palette.GRAY;
    const iconColor = disabled ? Palette.GRAY : color;

    return (
        <Button disabled={disabled} type="link" onClick={onClick}>
            <Flex style={{ width: "100%", color: iconColor }} gap="small">
                {icon}
                <Typography.Text
                    style={{ color: textColor, fontSize: FontSize.SMALL }}
                >
                    {title}
                </Typography.Text>
            </Flex>
        </Button>
    );
}
