import { EmployeesProvider } from "@/contexts/employees";
import { EmployeeEditorProvider } from "@/contexts/employees/editor";
import { EmployeesSearch } from "@/pages/employees/search";
import { EmployeesViewer } from "@/pages/employees/viewer";
import { Layout, Flex } from "antd";

export function EmployeesPage() {
    return (
        <EmployeesProvider>
            <EmployeeEditorProvider>
                <Flex
                    align="center"
                    justify="center"
                    style={{
                        width: "80%",
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
            </EmployeeEditorProvider>
        </EmployeesProvider>
    );
}
