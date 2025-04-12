import { ITradeUnionDepartmentRecord } from "@/model";
import { SelectTreeField } from "@/view/primitives/fields/derivatives/select-tree/SelectTreeField";
import { useTrees } from "@/controller/trees";

export interface ITradeUnionDepartmentEditFieldProps {
    value: ITradeUnionDepartmentRecord;
    onChange: (value: ITradeUnionDepartmentRecord) => void;
}

export function TradeUnionDepartmentEditField(
    props: ITradeUnionDepartmentEditFieldProps
) {
    const { value, onChange } = props;
    const { tradeUnionDepartmentsTree } = useTrees();

    return (
        <SelectTreeField.Edit
            tree={tradeUnionDepartmentsTree}
            selectedPath={value.tradeUnionDepartmentOptionPath}
            onChange={(tradeUnionDepartmentOptionPath) =>
                onChange({ ...value, tradeUnionDepartmentOptionPath })
            }
        />
    );
}
