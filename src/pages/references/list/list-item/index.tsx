import { ISelectableListItemProps } from "@/components/selectable-list";
import { IEnumerated } from "@/model";

export function EnumerationsListItem(
    props: ISelectableListItemProps<IEnumerated>
) {
    const { item } = props;

    return item.label;
}
