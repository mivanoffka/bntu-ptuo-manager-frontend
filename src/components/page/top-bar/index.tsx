import { Expandable } from "@/components/containers";
import { Logo } from "@/components/page/top-bar/logo";
import { SignOutButton } from "@/components/page/top-bar/sign-out-button";
import { Palette } from "@/constants";
import { useAuth } from "@/contexts/auth";
import {
    AuditOutlined,
    DatabaseOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { MenuProps, Flex, Typography, Menu } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { USER_GROUPS, UserRole } from "@/model";

export interface ITopBar {
    children?: React.ReactNode;
}

export function TopBar() {
    const { user } = useAuth();
    const userRole = user ? user.role : UserRole.UNAUTHORIZED;

    if (!user) {
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
    ];

    if (USER_GROUPS[UserRole.MANAGER].includes(userRole)) {
        items.push({
            label: "Справочные таблицы",
            key: "/references",
            icon: <DatabaseOutlined />,
        });
    }

    if (USER_GROUPS[UserRole.ADMIN].includes(userRole)) {
        items.push({
            label: "Пользователи",
            key: "/users",
            icon: <TeamOutlined />,
        });
    }

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
                            <Typography.Text>{user.username}</Typography.Text>
                        </Flex>
                    </Expandable>
                </Flex>
            </div>
        </div>
    );
}
