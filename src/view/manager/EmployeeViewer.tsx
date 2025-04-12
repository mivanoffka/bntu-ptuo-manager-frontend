import { useOneSelectedEmployeeVersion } from "@/controller/employee";
import { Flex, Typography } from "antd";
import { Employee } from "@/view/employee/Employee";
import { EmployeeFooterToolbar } from "@/view/manager/EmployeeFooterToolbar";
import { EmployeeHeaderToolbar } from "@/view/manager/toolbar/EmployeeHeaderToolbar";

export function EmployeesViewer() {
    const { employeeVersion } = useOneSelectedEmployeeVersion();

    const emptyContent = (
        <Typography.Text type="secondary">
            Выберите сотрудника из списка или создайте нового
        </Typography.Text>
    );

    const content = (
        <Flex
            justify="space-between"
            align="center"
            vertical
            style={{ width: "100%", height: "100%" }}
        >
            <EmployeeHeaderToolbar></EmployeeHeaderToolbar>
            <Employee></Employee>
            <EmployeeFooterToolbar></EmployeeFooterToolbar>
        </Flex>
    );

    return (
        <Flex
            align="center"
            justify="center"
            style={{ width: "100%", height: "100%" }}
        >
            {employeeVersion ? content : emptyContent}
        </Flex>
    );
}
