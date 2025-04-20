import { Palette, FontSize } from "@/view/constants";
import { Button, Flex, Typography } from "antd";
import "./tool-bar-button.css";

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

    const actuallyDisabled =
        onClick !== undefined && onClick !== null ? disabled : true;

    const textColor = actuallyDisabled ? Palette.LIGHT_GRAY : Palette.GRAY;
    const iconColor = actuallyDisabled ? Palette.GRAY : color;

    return (
        <Button
            className="toolbar-button"
            disabled={actuallyDisabled}
            type="link"
            onClick={onClick}
        >
            <Flex style={{ width: "100%", color: iconColor }} gap="small">
                {icon}
                <Typography.Text
                    className="toolbar-text"
                    style={{ color: textColor, fontSize: FontSize.SMALL }}
                >
                    {title}
                </Typography.Text>
            </Flex>
        </Button>
    );
}
