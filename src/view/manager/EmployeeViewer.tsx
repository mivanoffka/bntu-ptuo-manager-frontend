import "@/view/manager/style/employee-viewer.css";
import { useEmployeeEditor } from "@/controller/employee/EmployeeEditorContext";
import { Flex, Typography } from "antd";
import { EmployeeToolbar } from "@/view/manager/EmployeeToolbar";
import { Employee } from "@/view/employee/Employee";

export function EmployeesViewer() {
    const { displayedEmployee } = useEmployeeEditor();

    const emptyContent = (
        <Typography.Text type="secondary">
            Выберите сотрудника из списка или создайте нового
        </Typography.Text>
    );

    return (
        <div className="container">
            <EmployeeToolbar></EmployeeToolbar>
            <div className="inner-container">
                {displayedEmployee ? <Employee /> : emptyContent}
            </div>
        </div>
    );
}
