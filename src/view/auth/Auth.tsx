import { useNavigate, useLocation } from "react-router-dom";
import { SignIn } from "@/view/auth/SignIn";
import { SignUp } from "@/view/auth/SignUp";
import { FontSize } from "@/view/constants";
import { Layout } from "@/view/layout/Layout";
import { Flex, Tabs, Typography } from "antd";

export function Auth() {
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
        <Layout>
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
        </Layout>
    );
}
