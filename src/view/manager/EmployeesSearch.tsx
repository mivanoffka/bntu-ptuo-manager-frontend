import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Space } from "antd";
import "./list-item.css";
import { Palette } from "@/view/constants";

import { Toolbar } from "@/view/manager/toolbar/Toolbar";
import { EmployeesList } from "@/view/manager/EmployeesList";

export function EmployeesSearch() {
    return (
        <Flex
            justify="space-between"
            align="center"
            vertical
            style={{ width: "100%", height: "100%" }}
        >
            <Toolbar>
                <Space.Compact style={{ width: "100%" }}>
                    <Input placeholder="Поиск"></Input>
                    <Button style={{ color: Palette.BLUE }}>
                        <SearchOutlined />
                    </Button>
                </Space.Compact>
            </Toolbar>
            <Flex
                align="center"
                vertical
                style={{ width: "90%", height: "30%" }}
            >
                <EmployeesList></EmployeesList>
            </Flex>
            <Flex
                align="center"
                vertical
                style={{ width: "100%", height: "60%" }}
            >
                ...
            </Flex>
            <Toolbar></Toolbar>
        </Flex>
    );
}
