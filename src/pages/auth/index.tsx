import { FontSize } from "@/constants";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { Flex, Layout, Tabs, Typography } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

export function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabKey = location.pathname.endsWith("sign-up")
        ? "sign-up"
        : "sign-in";

    const items = [
        {
            key: "sign-in",
            label: (
                <Typography.Text style={{ fontSize: FontSize.SMALL }}>
                    ВХОД В СИСТЕМУ
                </Typography.Text>
            ),
            children: <SignIn />,
        },
        {
            key: "sign-up",
            label: (
                <Typography.Text style={{ fontSize: FontSize.SMALL }}>
                    РЕГИСТРАЦИЯ
                </Typography.Text>
            ),
            children: <SignUp />,
        },
    ];

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "20%", backgroundColor: "white" }}
        >
            <Flex
                vertical
                align="center"
                justify="center"
                gap="middle"
                style={{ width: "75%" }}
            >
                <Tabs
                    centered
                    activeKey={tabKey}
                    onChange={(key) => navigate(`/auth/${key}`)}
                    style={{ width: "100%" }}
                    items={items}
                />
            </Flex>
        </Flex>
    );
}
