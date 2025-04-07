import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import { ReactNode } from "react";

export interface IToggleButtonProps {
    isChecked: boolean;
    label: ReactNode;
    checkedLabel?: ReactNode;
    onChange(value: boolean): void;
    shape?: BaseButtonProps["shape"];
    reversed?: boolean;
}

export function ToggleButton(props: IToggleButtonProps) {
    const {
        isChecked,
        label,
        checkedLabel = label,
        onChange,
        reversed,
        shape = "circle",
    } = props;

    const content = isChecked ? checkedLabel : label;

    function toggleIsChecked() {
        onChange(!isChecked);
    }

    const styleType = reversed
        ? isChecked
            ? "default"
            : "primary"
        : isChecked
        ? "primary"
        : "default";

    return (
        <Button
            size="small"
            type={styleType}
            shape={shape}
            onClick={toggleIsChecked}
        >
            {content}
        </Button>
    );
}
