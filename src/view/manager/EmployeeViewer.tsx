import "@/view/manager/style/employee-viewer.css";
import { useOneSelectedEmployeeVersion } from "@/controller/employee";
import { Flex, Typography } from "antd";
import { EmployeeToolbar } from "@/view/manager/EmployeeToolbar";
import { Employee } from "@/view/employee/Employee";

export function EmployeesViewer() {
    const { employeeVersion } = useOneSelectedEmployeeVersion();

    const emptyContent = (
        <Typography.Text type="secondary">
            Выберите сотрудника из списка или создайте нового
        </Typography.Text>
    );

    return (
        <div className="container">
            <EmployeeToolbar></EmployeeToolbar>
            <div className="inner-container">
                {employeeVersion ? <Employee></Employee> : emptyContent}
            </div>
        </div>
    );
}
