import { EmployeesList } from "@/view/manager/EmployeesList";
import "./style/index.css";
import { EmployeesViewer } from "@/view/manager/EmployeeViewer";
import { Flex } from "antd";
import { EmployeesSearch } from "@/view/manager/EmployeesSearch";

export function Layout() {
    return (
        <div className="layout">
            <Flex
                align="center"
                justify="center"
                style={{ width: "100%", height: "100%" }}
            >
                <Flex
                    vertical
                    align="center"
                    justify="center"
                    style={{ width: "30%", height: "100%" }}
                >
                    <EmployeesSearch></EmployeesSearch>
                </Flex>
                <Flex
                    align="center"
                    justify="center"
                    vertical
                    style={{ width: "70%", height: "100%" }}
                >
                    <EmployeesViewer></EmployeesViewer>
                </Flex>
            </Flex>
        </div>
    );
}
