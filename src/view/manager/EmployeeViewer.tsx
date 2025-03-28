import "@/view/manager/style/employee-viewer.css";
import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { Flex, Typography } from "antd";
import { EmployeeToolbar } from "@/view/manager/EmployeeToolbar";
import { DisplayedEmployee } from "@/view/employee/Employee";

export function EmployeesViewer() {
    const { displayedEmployee } = useDisplayedEmployee();

    const emptyContent = (
        <Typography.Text type="secondary">
            Выберите сотрудника из списка или создайте нового
        </Typography.Text>
    );

    return (
        <div className="container">
            <EmployeeToolbar></EmployeeToolbar>
            <div className="inner-container">
                {displayedEmployee ? <DisplayedEmployee /> : emptyContent}
            </div>
        </div>
    );
}
