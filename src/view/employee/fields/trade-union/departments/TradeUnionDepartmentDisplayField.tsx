import { ITradeUnionDepartmentRecord } from "@/model";
import { SelectTreeField } from "@/view/primitives/fields/derivatives/select-tree/SelectTreeField";
import { useTrees } from "@/controller/trees";

export interface ITradeUnionDepartmentDisplayFieldProps {
    value: ITradeUnionDepartmentRecord;
}

export function TradeUnionDepartmentDisplayField(
    props: ITradeUnionDepartmentDisplayFieldProps
) {
    const { value } = props;
    const { tradeUnionDepartmentsTree } = useTrees();

    return (
        <SelectTreeField.Display
            tree={tradeUnionDepartmentsTree}
            selectedPath={value.tradeUnionDepartmentOptionPath}
        />
    );
}
