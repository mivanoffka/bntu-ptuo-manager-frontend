import { IconButton } from "@/components/buttons";
import { FieldContainer } from "@/components/containers";
import { FontSize, Palette } from "@/constants";
import { useAuth } from "@/contexts/auth";
import { CheckOutlined } from "@ant-design/icons";
import { Flex, Input, Typography } from "antd";
import { useState } from "react";

export function SignUp() {
    const { signUp } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState<string>("");

    async function onClick() {
        if (password !== passwordConfirmation) return;
        await signUp(username, password);
        setHasApplied(true);
    }

    const [hasApplied, setHasApplied] = useState<boolean>(false);

    if (hasApplied) {
        return (
            <Flex
                vertical
                align="center"
                justify="space-evenly"
                gap="large"
                style={{ width: "100%" }}
            >
                <Typography.Text
                    style={{
                        fontSize: FontSize.SMALL,
                        color: Palette.GRAY,
                    }}
                >
                    Вы успешно подали заявку на регистрацию. Дождитесь, пока она
                    будет одобрена администратором.
                </Typography.Text>
            </Flex>
        );
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
                <FieldContainer title="Имя пользователя" name="username">
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FieldContainer>
                <FieldContainer title="Пароль" name="password">
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FieldContainer>
                <FieldContainer
                    title="Подтвердитe пароль"
                    name="passwordConfirmation"
                >
                    <Input.Password
                        value={password}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />
                </FieldContainer>
            </Flex>

            <Flex align="center" justify="center" style={{ width: "75%" }}>
                <IconButton
                    onClick={onClick}
                    title="Подать заявку"
                    icon={<CheckOutlined />}
                    isPrimary
                ></IconButton>
            </Flex>
        </Flex>
    );
}
