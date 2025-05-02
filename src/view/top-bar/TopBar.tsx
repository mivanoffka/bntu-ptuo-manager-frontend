import React, { useEffect, useState } from "react";
import "@/view/top-bar/style/top-bar.css";
import { useAuth } from "@/controller/auth";
import { Flex, Menu, MenuProps, Tabs, Typography } from "antd";
import { SignOutButton } from "@/view/auth/buttons/SignOutButton";
import {
    AuditOutlined,
    DatabaseOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export interface ITopBar {
    children?: React.ReactNode;
}

export function TopBar() {
    const { isAuthorized } = useAuth();

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
            disabled: true,
            icon: <TeamOutlined />,
        },
    ];

    return (
        <div className="top-bar">
            <div className="top-bar-menu">
                <Flex align="center" justify="center" style={{ width: "20%" }}>
                    <Typography.Text>
                        Первичная профсоюзная организация
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
                    <SignOutButton></SignOutButton>
                </Flex>
            </div>
        </div>
    );
}
