import { MessageOutlined } from "@ant-design/icons";
import { Dropdown, DropdownProps, Flex, MenuProps } from "antd";
import { ReactNode } from "react";

export interface IExpandableProps {
    children?: ReactNode;
    content?: ReactNode;
    icon?: ReactNode;
    placement?: DropdownProps["placement"];
    disabled?: boolean;
}

export function Expandable(props: IExpandableProps) {
    const { children, content, icon, placement, disabled } = props;

    const items: MenuProps["items"] = [
        {
            key: 0,
            label: (
                <Flex vertical style={{ width: "100%" }}>
                    {content}
                </Flex>
            ),
        },
    ];

    return (
        <Dropdown
            disabled={disabled}
            placement={placement || "bottom"}
            trigger={["click"]}
            menu={{ items }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Flex gap="small">
                    {children}
                    {content ? icon ? icon : <MessageOutlined /> : <div></div>}
                </Flex>
            </a>
        </Dropdown>
    );
}
