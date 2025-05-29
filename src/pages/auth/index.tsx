import { Logo } from "@/components/page/top-bar/logo";
import { FontSize, Palette } from "@/constants";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { Divider, Flex, Layout, Tabs, Typography } from "antd";
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
            style={{
                width: "25%",
                backgroundColor: "white",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Flex
                vertical
                align="center"
                justify="center"
                style={{
                    width: "75%",
                }}
            >
                <Flex gap="20px" align="center">
                    <Logo size={40}></Logo>
                    <Flex vertical gap="0px">
                        <Typography.Text
                            style={{
                                fontSize: "18px",
                                margin: "0",
                                padding: "0",
                                letterSpacing: "1px",
                            }}
                        >
                            РАБОТНИКОВ БНТУ
                        </Typography.Text>
                        <Flex gap="3px">
                            <Typography.Text
                                style={{
                                    filter: "brightness(90%)",
                                    color: Palette.GREEN,
                                    fontSize: "10px",
                                    margin: "0",
                                    padding: "0",
                                    letterSpacing: "1px",
                                }}
                            >
                                ИНФОРМАЦИОННАЯ
                            </Typography.Text>
                            <Typography.Text
                                style={{
                                    filter: "brightness(90%)",

                                    color: Palette.BLUE,
                                    fontSize: "10px",
                                    margin: "0",
                                    padding: "0",
                                    letterSpacing: "1px",
                                }}
                            >
                                СИСТЕМА
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Divider />
                <Tabs
                    centered
                    activeKey={tabKey}
                    onChange={(key) => navigate(`/auth/${key}`)}
                    style={{ width: "100%" }}
                    items={items}
                />
                <Divider />
            </Flex>
        </Flex>
    );
}
