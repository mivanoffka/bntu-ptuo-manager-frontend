import { ISelectableListItemProps } from "@/components/selectable-list";
import { IEmployee } from "@/model";

export function EmployeesListItem(props: ISelectableListItemProps<IEmployee>) {
    const { item } = props;

    const { firstName, lastName, middleName } = item.latestEmployeeVersion;
    return `${lastName} ${firstName} ${middleName}`;
}
