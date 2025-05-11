import { Palette, FontSize } from "@/view/constants";
import { Button, Flex, Typography } from "antd";
import "./tool-bar-button.css";

import React from "react";
import { BaseButtonProps } from "antd/es/button/button";

export interface IToolBarButtonProps {
    onClick: (() => any) | null;
    title: React.ReactNode;
    icon: React.ReactNode;
    color?: string;
    disabled?: boolean;
    isPrimary?: boolean;
}

export function ToolBarButton(props: IToolBarButtonProps) {
    const {
        onClick,
        title,
        icon,
        color,
        disabled = false,
        isPrimary = false,
    } = props;

    const actuallyDisabled =
        onClick !== undefined && onClick !== null ? disabled : true;

    const textColor = actuallyDisabled ? Palette.LIGHT_GRAY : Palette.GRAY;
    const iconColor = actuallyDisabled ? Palette.GRAY : color;

    return (
        <Button
            className="toolbar-button"
            disabled={actuallyDisabled}
            type={isPrimary ? "primary" : "link"}
            onClick={onClick}
            color={color}
            style={{ width: "100%" }}
        >
            <Flex
                align="center"
                justify="center"
                style={{ width: "100%", color: iconColor }}
                gap="small"
            >
                <Typography.Text
                    className="toolbar-text"
                    style={{
                        color: isPrimary ? "white" : textColor,
                        fontSize: FontSize.SMALL,
                    }}
                >
                    {title}
                </Typography.Text>
                {icon}
            </Flex>
        </Button>
    );
}
