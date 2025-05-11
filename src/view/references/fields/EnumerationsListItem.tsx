import { IEmployee, IEnumerated } from "@/model";
import { ISelectableListItemProps } from "@/view/list/SelectableList";

export function EnumerationsListItem(
    props: ISelectableListItemProps<IEnumerated>
) {
    const { item } = props;

    return item.label;
}
