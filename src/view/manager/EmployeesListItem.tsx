import { IEmployee } from "@/model";
import { ISelectableListItemProps } from "@/view/list/SelectableList";

export function EmployeesListItem(props: ISelectableListItemProps<IEmployee>) {
    const { item } = props;

    const { firstName, lastName, middleName } = item.latestEmployeeVersion;
    return `${lastName} ${firstName} ${middleName}`;
}
