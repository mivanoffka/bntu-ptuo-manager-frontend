import { useAuth } from "@/controller/auth";
import { Color } from "@/view/constants";
import { SecondaryLabel } from "@/view/primitives";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

export function SignOutButton() {
    const { signOut } = useAuth();
    return (
        <Button
            style={{ border: "none", color: Color.GREEN }}
            type="link"
            onClick={signOut}
        >
            <Flex gap="small">
                <SecondaryLabel>Выйти</SecondaryLabel>
                <ArrowRightOutlined style={{ color: Color.BLUE }} />
            </Flex>
        </Button>
    );
}
