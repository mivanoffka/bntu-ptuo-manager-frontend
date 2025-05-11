import { SignIn } from "@/view/auth/SignIn";
import { SignUp } from "@/view/auth/SignUp";
import { FontSize } from "@/view/constants";
import { Layout } from "@/view/layout/Layout";
import { Flex, Tabs, Typography } from "antd";

export function Auth() {
    const items = [
        {
            key: "1",
            label: (
                <Typography.Text style={{ fontSize: FontSize.SMALL }}>
                    ВХОД В СИСТЕМУ
                </Typography.Text>
            ),
            children: <SignIn></SignIn>,
        },
        {
            key: "2",
            label: (
                <Typography.Text style={{ fontSize: FontSize.SMALL }}>
                    РЕГИСТРАЦИЯ
                </Typography.Text>
            ),
            children: <SignUp></SignUp>,
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
                        style={{ width: "100%" }}
                        items={items}
                    ></Tabs>
                </Flex>
            </Flex>
        </Layout>
    );
}
