import { MessageOutlined } from "@ant-design/icons";
import { Dropdown, DropdownProps, Flex, MenuProps } from "antd";
import { ReactNode } from "react";

export interface ICommentedProps {
    children?: ReactNode;
    comment?: ReactNode;
    icon?: ReactNode;
    placement?: DropdownProps["placement"];
}

export function Commented(props: ICommentedProps) {
    const { children, comment, icon, placement } = props;

    const items: MenuProps["items"] = [
        {
            key: 0,
            label: (
                <Flex vertical style={{ width: "100%" }}>
                    {comment}
                </Flex>
            ),
        },
    ];

    return (
        <Dropdown
            placement={placement || "bottom"}
            trigger={["click"]}
            menu={{ items }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Flex gap="small">
                    {children}
                    {comment ? icon ? icon : <MessageOutlined /> : <div></div>}
                </Flex>
            </a>
        </Dropdown>
    );
}
