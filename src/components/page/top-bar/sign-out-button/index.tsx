import { SecondaryLabel } from "@/components/labels";
import { Palette } from "@/constants";
import { useAuth } from "@/contexts/auth";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";

export function SignOutButton() {
    const { signOut } = useAuth();

    return (
        <Button
            style={{ border: "none", color: Palette.GREEN }}
            type="link"
            onClick={signOut}
        >
            <Flex gap="small">
                <SecondaryLabel>Выйти</SecondaryLabel>
                <ArrowRightOutlined style={{ color: Palette.BLUE }} />
            </Flex>
        </Button>
    );
}
