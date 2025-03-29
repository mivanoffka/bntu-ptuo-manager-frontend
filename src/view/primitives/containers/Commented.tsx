import { MessageOutlined } from "@ant-design/icons";
import { Dropdown, Flex, MenuProps } from "antd";
import { ReactNode } from "react";

export interface ICommentedProps {
    children?: ReactNode;
    comment?: ReactNode;
    icon?: ReactNode;
    placement?: string;
}

export function Commented(props: ICommentedProps) {
    const { children, comment, icon, placement } = props;

    const items: MenuProps["items"] = [
        {
            key: 0,
            label: <div>{comment}</div>,
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
