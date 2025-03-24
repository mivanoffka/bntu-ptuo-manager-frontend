import "@/view/manager/style/employees-list.css";
import { useDisplayedEmployee } from "@/controller/employee/DisplayedEmployeeContext";

export function EmployeesViewer() {
    const { displayedEmployee } = useDisplayedEmployee();
    return (
        <div>
            {displayedEmployee
                ? displayedEmployee.id
                : "Выберите сотрудника из списка"}
        </div>
    );
}
