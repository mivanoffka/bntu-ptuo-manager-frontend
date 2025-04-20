import React from "react";
import "@/view/top-bar/style/top-bar.css";
import { useAuth } from "@/controller/auth";
import { Flex, Typography } from "antd";
import { SignOutButton } from "@/view/auth/buttons/SignOutButton";

export interface ITopBar {
    children?: React.ReactNode;
}

export function TopBar() {
    const { isAuthorized, signOut } = useAuth();

    if (!isAuthorized) {
        return;
    }

    return (
        <div className="top-bar">
            <div className="top-bar-menu">
                <Flex vertical>
                    <Typography.Text>
                        Первичная профсоюзная организация
                    </Typography.Text>
                </Flex>

                <SignOutButton></SignOutButton>
            </div>
        </div>
    );
}
