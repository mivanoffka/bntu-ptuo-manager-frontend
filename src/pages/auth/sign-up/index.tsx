import { IconButton } from "@/components/buttons";
import { FieldContainer } from "@/components/containers";
import { FontSize, Palette } from "@/constants";
import { useAuth } from "@/contexts/auth";
import { CheckOutlined } from "@ant-design/icons";
import { Flex, Form, Input, Typography } from "antd";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export function SignUp() {
    const { signUp } = useAuth();
    const [form] = Form.useForm();
    const [hasApplied, setHasApplied] = useState<boolean>(false);

    const onFinish = async (values: {
        username: string;
        password: string;
        passwordConfirmation: string;
    }) => {
        await signUp(values.username, values.password);
        setHasApplied(true);
    };

    if (hasApplied) {
        return (
            <Flex
                vertical
                align="center"
                justify="space-evenly"
                gap="large"
                style={{ width: "100%" }}
            >
                <Helmet title="Регистрация – ИС ППО работников БНТУ" />
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
            <Helmet title="Регистрация – ИС ППО работников БНТУ" />
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{ width: "100%" }}
            >
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
                        <FieldContainer title="Имя пользователя">
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Пожалуйста, введите имя пользователя",
                                    },
                                    {
                                        min: 3,
                                        message:
                                            "Имя пользователя должно содержать минимум 3 символа",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </FieldContainer>
                        <FieldContainer title="Пароль">
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Пожалуйста, введите пароль",
                                    },
                                    {
                                        min: 6,
                                        message:
                                            "Пароль должен содержать минимум 6 символов",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </FieldContainer>
                        <FieldContainer title="Подтвердитe пароль">
                            <Form.Item
                                name="passwordConfirmation"
                                dependencies={["password"]}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Пожалуйста, подтвердите пароль",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue("password") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error("Пароли не совпадают")
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        </FieldContainer>
                    </Flex>

                    <Form.Item style={{ width: "75%" }}>
                        <IconButton
                            isSubmit
                            title="Подать заявку"
                            icon={<CheckOutlined />}
                            isPrimary
                            onClick={() => {}}
                        />
                    </Form.Item>
                </Flex>
            </Form>
        </Flex>
    );
}
