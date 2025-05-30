import { IconButton } from "@/components/buttons";
import { FieldContainer } from "@/components/containers";
import { useAuth } from "@/contexts/auth";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export function SignIn() {
    const { signIn } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Flex
            vertical
            align="center"
            justify="space-evenly"
            gap="large"
            style={{ width: "100%" }}
        >
            <Helmet title="Вход – ИС ППО работников БНТУ" />
            <Flex
                vertical
                align="center"
                justify="space-evenly"
                gap="small"
                style={{ width: "100%" }}
            >
                <FieldContainer title="Имя пользователя">
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FieldContainer>
                <FieldContainer title="Пароль">
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FieldContainer>
            </Flex>

            <Flex align="center" justify="center" style={{ width: "75%" }}>
                <IconButton
                    onClick={() => signIn(username, password)}
                    title="Выполнить вход"
                    icon={<ArrowRightOutlined />}
                    isPrimary
                />
            </Flex>
        </Flex>
    );
}
