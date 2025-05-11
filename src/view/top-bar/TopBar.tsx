import React, { useEffect, useState } from "react";
import "@/view/top-bar/style/top-bar.css";
import { useAuth } from "@/controller/auth";
import { Flex, Menu, MenuProps, Tabs, Typography } from "antd";
import { SignOutButton } from "@/view/auth/buttons/SignOutButton";
import {
    AuditOutlined,
    DatabaseOutlined,
    FormatPainterFilled,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FontSize, Palette } from "@/view/constants";
import { Expandable } from "@/view/primitives/containers";
import { Logo } from "@/view/logo/Logo";

export interface ITopBar {
    children?: React.ReactNode;
}

export function TopBar() {
    const { isAuthorized, username } = useAuth();

    if (!isAuthorized) {
        return;
    }

    const navigate = useNavigate();

    const [current, setCurrent] = useState("/employees");

    useEffect(() => {
        navigate(current);
    }, [current]);

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    const items = [
        {
            label: "Учётные карточки",
            key: "/employees",
            icon: <AuditOutlined />,
        },
        {
            label: "Справочные таблицы",
            key: "/references",
            icon: <DatabaseOutlined />,
        },
        {
            label: "Пользователи",
            key: "/users",
            icon: <TeamOutlined />,
        },
    ];

    return (
        <div className="top-bar">
            <div className="top-bar-menu">
                <Flex
                    gap="middle"
                    align="center"
                    justify="center"
                    style={{ width: "20%" }}
                >
                    <Logo></Logo>
                    <Typography.Text
                        style={{
                            margin: 0,
                            padding: 0,
                            color: Palette.GRAY,
                            fontSize: 12,
                        }}
                    >
                        РАБОТНИКОВ БНТУ
                    </Typography.Text>
                </Flex>
                <Flex align="center" justify="center" style={{ width: "60%" }}>
                    <Menu
                        style={{ width: "100%" }}
                        onClick={onClick}
                        selectedKeys={[current]}
                        mode="horizontal"
                        items={items}
                    />
                </Flex>
                <Flex align="center" justify="center" style={{ width: "20%" }}>
                    <Expandable
                        content={
                            <Flex align="center" justify="center">
                                <SignOutButton></SignOutButton>
                            </Flex>
                        }
                        icon={
                            <UserOutlined
                                style={{ color: Palette.BLUE }}
                            ></UserOutlined>
                        }
                    >
                        <Flex gap="small" align="center" justify="center">
                            <Typography.Text>{username}</Typography.Text>
                        </Flex>
                    </Expandable>
                </Flex>
            </div>
        </div>
    );
}
