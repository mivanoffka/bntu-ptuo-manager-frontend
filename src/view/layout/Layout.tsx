import { EmployeesList } from "@/view/manager/EmployeesList";
import "./style/index.css";
import { EmployeesViewer } from "@/view/manager/EmployeeViewer";
import { Flex } from "antd";

export function Layout() {
    return (
        <div className="layout">
            <Flex
                align="center"
                justify="center"
                style={{ width: "100%", height: "100%" }}
            >
                <Flex vertical style={{ width: "30%", height: "100%" }}>
                    <EmployeesList></EmployeesList>
                </Flex>
                <Flex vertical style={{ width: "70%", height: "100%" }}>
                    <EmployeesViewer></EmployeesViewer>
                </Flex>
            </Flex>
        </div>
    );
}
