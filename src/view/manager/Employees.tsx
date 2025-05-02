import { EmployeesViewer } from "@/view/manager/EmployeeViewer";
import { Flex } from "antd";
import { EmployeesSearch } from "@/view/manager/EmployeesSearch";
import {
    EmployeeEditorProvider,
    EmployeesProvider,
} from "@/controller/employee";
import { Layout } from "@/view/layout/Layout";

export function Employees() {
    return (
        <EmployeesProvider>
            <EmployeeEditorProvider>
                <Layout>
                    <Flex
                        align="center"
                        justify="center"
                        style={{
                            width: "60%",
                            height: "100%",
                            backgroundColor: "white",
                        }}
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
                </Layout>
            </EmployeeEditorProvider>
        </EmployeesProvider>
    );
}
