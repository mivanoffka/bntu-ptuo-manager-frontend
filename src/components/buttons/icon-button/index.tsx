import { Palette, FontSize } from "@/constants";
import { Button, Flex, Typography } from "antd";
import "./style.css";

import React from "react";

export interface IIconButtonProps {
    onClick: (() => any) | null;
    title: React.ReactNode;
    icon: React.ReactNode;
    color?: string;
    disabled?: boolean;
    isPrimary?: boolean;
}

export function IconButton(props: IIconButtonProps) {
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
            className="icon-button"
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
