import { useAuth } from "@/controller/auth";
import { Input, Button, Flex, Card, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const { signIn } = useAuth();

    const onSubmitForm = async (values) => {
        await signIn(values.username, values.password);
    };

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: "300px" }}
        >
            <Typography.Title level={2} style={{ textAlign: "center" }}>
                Вход в систему
            </Typography.Title>
            <Form layout="vertical" onFinish={onSubmitForm}>
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Укажите имя пользователя!",
                        },
                    ]}
                >
                    <Input placeholder="Имя пользователя" autoComplete="off" />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Укажите пароль!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Password" autoComplete="off" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    );
}
