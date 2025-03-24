import "@/view/manager/style/employee-viewer.css";
import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";
import { Typography } from "antd";
import { EmployeeToolbar } from "@/view/manager/EmployeeToolbar";

export function EmployeesViewer() {
    const { displayedEmployee } = useDisplayedEmployee();

    const emptyContent = (
        <Typography.Text type="secondary">
            Выберите сотрудника из списка или создайте нового
        </Typography.Text>
    );

    const content = (
        <div>"Выберите сотрудника из списка или создайте нового"</div>
    );

    return (
        <div className="container">
            <EmployeeToolbar></EmployeeToolbar>
            <div className="container">
                {displayedEmployee ? content : emptyContent}
            </div>
        </div>
    );
}
