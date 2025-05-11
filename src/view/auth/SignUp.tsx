import { useAuth } from "@/controller/auth";
import {
    PasswordConfirmationField,
    PasswordField,
    UsernameField,
} from "@/view/auth/fields";
import { ToolBarButton } from "@/view/manager/toolbar/buttons/ToolBarButton";
import { CheckOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { useState } from "react";

export function SignUp() {
    const { signUp } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState<string>("");

    function onClick() {
        if (password !== passwordConfirmation) return;
        signUp(username, password);
    }

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
                <PasswordConfirmationField
                    value={passwordConfirmation}
                    onChange={setPasswordConfirmation}
                />
            </Flex>

            <Flex align="center" justify="center" style={{ width: "75%" }}>
                <ToolBarButton
                    onClick={onClick}
                    title="Подать заявку"
                    icon={<CheckOutlined />}
                    isPrimary
                ></ToolBarButton>
            </Flex>
        </Flex>
    );
}
