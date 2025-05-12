import { IconButton } from "@/components/buttons";
import { useAuth } from "@/contexts/auth";
import { PasswordField, UsernameField } from "@/pages/auth/fields";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useState } from "react";

export function SignIn() {
    const { signIn } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <Flex
            vertical
            align="center"
            justify="space-evenly"
            gap="large"
            style={{ width: "100%" }}
        >
            <Flex
                vertical
                align="center"
                justify="space-evenly"
                gap="small"
                style={{ width: "100%" }}
            >
                <UsernameField value={username} onChange={setUsername} />
                <PasswordField value={password} onChange={setPassword} />
            </Flex>

            <Flex align="center" justify="center" style={{ width: "75%" }}>
                <IconButton
                    onClick={() => signIn(username, password)}
                    title="Выполнить вход"
                    icon={<ArrowRightOutlined />}
                    isPrimary
                ></IconButton>
            </Flex>
        </Flex>
    );
}
