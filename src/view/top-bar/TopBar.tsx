import React from "react";
import "@/view/top-bar/style/top-bar.css";
import { useAuth } from "@/controller/auth";
import { Navigate } from "react-router-dom";
import { Flex, Typography } from "antd";
import { SignOutButton } from "@/view/auth/buttons/SignOutButton";
import { HddOutlined } from "@ant-design/icons";

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
                <Typography.Text>ППО работников БНТУ</Typography.Text>

                <SignOutButton></SignOutButton>
            </div>
        </div>
    );
}
