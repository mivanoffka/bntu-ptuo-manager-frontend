import { useSelectedEmployees } from "@/controller/employee";
import { IEmployee, IEmployeeVersion, NameUtility } from "@/model";
import { LabelField } from "@/view/primitives";
import { Button, Flex } from "antd";

export interface IEmployeeListItemProps {
    employee: IEmployee;
}

export function EmployeesListItem(props: IEmployeeListItemProps) {
    const { employee } = props;
    const { latestEmployeeVersion: employeeVersion } = employee;
    const { firstName, lastName, middleName } = employeeVersion;
    const label = `${lastName} ${firstName} ${middleName}`;

    const { toggleSingularSelection } = useSelectedEmployees();

    return (
        <Flex
            style={{ width: "100%" }}
            onClick={() => toggleSingularSelection(employee.id)}
        >
            {label}
        </Flex>
    );
}
