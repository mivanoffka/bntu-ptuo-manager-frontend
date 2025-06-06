import { Palette, FontSize } from "@/constants";
import { Button, Flex, Typography } from "antd";
import "./style.css";

import React from "react";
import { IconLabel, IIconLabel } from "@/components/labels";

export interface IIconButtonProps extends IIconLabel {
    onClick: (() => any) | null;
    disabled?: boolean;
    isPrimary?: boolean;
    isSubmit?: boolean;
    backgroundColor?: string;
}

export function IconButton(props: IIconButtonProps) {
    const {
        onClick,
        title,
        icon,
        textColor: textColorBase = Palette.GRAY,
        iconColor: iconColorBase,
        disabled: disabled = false,
        isPrimary = false,
    } = props;

    let textColor = textColorBase;
    let iconColor = iconColorBase;

    if (disabled) {
        textColor = Palette.LIGHT_GRAY;
        iconColor = Palette.GRAY;
    }

    if (isPrimary) {
        textColor = Palette.WHITE;
        iconColor = Palette.WHITE;
    }

    return (
        <Button
            htmlType={props.isSubmit ? "submit" : "button"}
            className="icon-button"
            disabled={disabled}
            type={isPrimary ? "primary" : "link"}
            onClick={onClick}
            style={{ width: "100%", height: "100%" }}
        >
            <IconLabel
                title={title}
                icon={icon}
                iconColor={iconColor}
                textColor={textColor}
            ></IconLabel>
        </Button>
    );
}
