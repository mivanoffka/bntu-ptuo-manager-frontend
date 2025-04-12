import { useSelectedEmployees } from "@/controller/employee";
import {
    HistoryUtility,
    IEmployee,
    IEmployeeVersion,
    NameUtility,
} from "@/model";
import { LabelField } from "@/view/primitives";
import { Button, Flex } from "antd";

export interface IEmployeeListItemProps {
    employee: IEmployee;
}

export function EmployeesListItem(props: IEmployeeListItemProps) {
    const { employee } = props;
    const { latestEmployeeVersion: employeeVersion } = employee;
    const { names } = employeeVersion;
    const name = HistoryUtility.fromCollection(names).relevant;
    const label = name ? NameUtility.getFullName(name) : "Без имени";

    const { toggleSingularSelection } = useSelectedEmployees();

    return (
        <Flex onClick={() => toggleSingularSelection(employee.id)}>
            {label}
        </Flex>
    );
}
