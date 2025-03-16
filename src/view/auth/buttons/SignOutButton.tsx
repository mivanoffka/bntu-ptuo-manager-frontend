import { useAuth } from "@/controller/auth";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

export function SignOutButton() {
    const { signOut } = useAuth();
    return (
        <Button style={{ border: "none" }} type="link" onClick={signOut}>
            <Flex gap="small">
                Выход
                <ArrowRightOutlined />
            </Flex>
        </Button>
    );
}
